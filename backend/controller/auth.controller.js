import mongoose from "mongoose";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateOTP from "../utils/optGenerator.js";
import User from "../model/user.model.js";
import { sendMail } from "../utils/sendMail.js";
import bcrypt from 'bcrypt'
import redisClient from "../config/redis.js"
import os from "node:os"

export const generateAccessTokenAndRefreshToken = async (id) => {
	try {
		const user = await User.findById(id);

		console.log("user ", user)

		const accessToken = await user.generateAccessToken();
		const refreshToken = await user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		console.error("error while generating tokens ", error);
	}
};



// register user
export const userRegister = asyncHandler(async (req, res) => {
	const { password, confirmPassword } = req.body;
	const email = req.body.email?.trim().toLowerCase();

	if (!email || !password || !confirmPassword) {
		throw new apiError(400, "please enter details");
	}
	if (password !== confirmPassword) {
		throw new apiError(400, "password and confirmPassword is not matched");
	}

	const userExists = await User.findOne({ email });
	if (userExists) {
		throw new apiError(400, "User with this mail is already registered");
	}
	const generateOtp = generateOTP(6);

	console.log(generateOtp)

	await redisClient.set(email, generateOtp, { EX: 300 });
	await sendMail("OTP Verificaton -- Linkly", generateOtp, email); // send mail

	await User.create({
		email,
		password,
	});

	return res
		.status(201)
		.json(new apiResponse(201, {email: email}, "otp send successfully"));
});


export const verifyEmail = asyncHandler(async (req, res) => {
	const { otp } = req.body;
	const email = req.body.email?.trim().toLowerCase();

	if (!otp || !email) {
		throw new apiError(400, "Please enter your email and verification code.");
	}
    const savedOtp = await redisClient.get(email)
	if(!savedOtp){
		throw new apiError(400, "OTP Expire, please resend")
	}
	if(String(otp) !== savedOtp){
		throw new apiError(400, "Invalid OTP")
	}

	const user = await User.findOne({email})
	if (!user) {
		throw new apiError(404, "No account found for this email.");
	}
	user.isEmailVerified = true;
	user.loginDevices.push(os.type())
	await user.save({ validateBeforeSave: false });

	const { accessToken, refreshToken } =
		await generateAccessTokenAndRefreshToken(user._id);

	const loggedInUser = await User.findById(user._id).select(
		"-password -refreshToken   -expiresAt",
	);

	await redisClient.del(email)  // delete otp from redis

	const options = {
		httpOnly: true,
		secure: true,
		sameSite: "none"
	};

	res.setHeader("Authorization", `Bearer ${accessToken}`);
	res.setHeader("Access-Control-Expose-Headers", "Authorization"); //related to CORS (Cross-Origin Resource Sharing), allowa client JS to read header
	// Browsers do NOT allow JavaScript to read custom headers from response

	return res
		.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)

		.json(
			new apiResponse(
				200,
				{ user: loggedInUser },
				"Mail verified and user created successfully",
			),
		);
});

export const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if(!email || !password){
		throw new apiError(404, "Please enter email and password");
	}

	const user = await User.findOne({ email: email.trim().toLowerCase() });
	if (!user) {
		throw new apiError(404, "email is not registerd");
	}

	
	const isCorrect = await bcrypt.compare(password, user.password)
	if(!isCorrect){
		throw new apiError(400, "Incorrect Password"); 

	}

	const { accessToken, refreshToken } =
		await generateAccessTokenAndRefreshToken(user._id);

	const loggedInUser = await User.findById(user._id).select(
		"-password -refreshToken -otp  -expiresAt",
	);

	const options = {
		httpOnly: true,
		secure: true,
		sameSite: "none"
	};

	res.setHeader("Authorization", `Bearer ${accessToken}`);
	res.setHeader("Access-Control-Expose-Headers", "Authorization"); //related to CORS (Cross-Origin Resource Sharing), allowa client JS to read header
	// Browsers do NOT allow JavaScript to read custom headers from response

	return res
		.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)

		.json(
			new apiResponse(
				200,
				{ user: loggedInUser },
				"Login successfully successfully",
			),
		);
});

export const logout = asyncHandler(async (req, res) => {
	const id = req.user._id;
    //console.log("user is " , req.user)
	const user = await User.findById(id);
	if (!user) {
		throw new apiError(404, "User not found");
	}

	user.refreshToken = "";
	await user.save();

	const options = {
		httpOnly: true,
		secure: true,
		sameSite: "none"
	};

	res.setHeader("Authorization", `Bearer `);
	res.setHeader("Access-Control-Expose-Headers", "Authorization");
	return res
		.status(200)
		.clearCookie("accessToken", options)
		.clearCookie("refreshToken", options)
		.json(new apiResponse(200, {}, "User logout successfully"));
});

export const resendOtp = asyncHandler(async (req, res) => {
	const { email } = req.body

	const generateOtp = generateOTP(6);
    console.log("resend otp ", generateOtp)
	await redisClient.set(email, generateOtp, { EX: 300 });

	await sendMail("Resend OTP Verification - Linkly", generateOtp, email);

	return res.status(200).json(new apiResponse(200, "Otp resend successfully"));
});



export const changePassword = asyncHandler(async (req, res) => {
	const { oldPassword, newPassword, confirmNewPassword } = req.body;
	if(!oldPassword.trim() || !newPassword.trim() || !confirmNewPassword.trim() ){
		throw new apiError(400, "please enter the values")
	}

	if (newPassword !== confirmNewPassword) {
		throw new apiError(400, "new password and confirmNewPassword not matched");
	}

	const user = await User.findById(req.user._id);
	if (!user) {
		throw new apiError(400, "Unautherized");
	}

	
	const isCorrect = await bcrypt.compare(oldPassword, user.password)
	if(!isCorrect){
		throw new apiError(400, "Old Password is incorrect"); 
	}
	// if (! await user.isPasswordCorrect(oldPassword)) {
	// 	throw new apiError(400, "Old Password is wrong");
	// }

	const updatedUser = await User.findById(user._id);
    updatedUser.password = newPassword
	await updatedUser.save({new : true})

	const options = {
		httpOnly: true,
		secure: true,
		sameSite: "none"
	};

	res.setHeader("Authorization", `Bearer `); 
	res.setHeader("Access-Control-Expose-Headers", "Authorization");

	return res
		.status(200)
		.clearCookie("accessToken", options)
		.clearCookie("refreshToken", options)
		.json(new apiResponse(200, "Passowrd updated , login again "));
});

export const forgotPassword = asyncHandler(async(req, res) => {
    
	const {email} = req.body
    const user = await User.findOne({email})
    if(!user){
        throw new apiError(404, "email is not register")
    }
	const generateOtp = generateOTP(6);

	await redisClient.set(email, otp, { EX: 300 });
	await sendMail("Password Reset -- Linkly", generateOtp, email);

	return res.status(200).json(new apiResponse(200, email, "Otp sent successfully"));

})

export const verifyOtpForForgotPassword = asyncHandler(async(req, res) => {
    const {email, otp} = req.body

    const savedOtp = await redisClient.get(email)
    if(!savedOtp){
        throw new apiError(400, "OTP Expire, please resend")
    }
    if(otp !== savedOtp){
        throw new apiError(400, "Invalid OTP")
    }
	await redisClient.del(email)
	return res.status(200).json(new apiResponse(200, email, "Otp verified successfully"));
})

export const setNewPassword = asyncHandler(async(req, re) => {

	const {email, password , confirmPassword} = req.body
	if(!password.trim() || !confirmPassword.trim()){
		throw new apiError(400, "please enter the password")
	}

	if(password !== confirmPassword){
		throw new apiError(400, "password and confirmPassword not matched")
	}

	const user = await User.findOne({email})
	if(!user){
		throw new apiError(404, "user not found")
	}

	user.password = password
	await user.save({validationBeforeSave: false})

	return res.status(200).json(
		new apiResponse(200, {}, "Password updated successfully, please login again")
	)

})