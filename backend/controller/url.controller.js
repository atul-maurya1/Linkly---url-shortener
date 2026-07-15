import mongoose from 'mongoose'
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import urlValidation from "../utils/url-Validation.js";
import Url from "../model/url.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { nanoid } from "nanoid";
import Click from '../model/click.model.js'
import os from 'os'
import {UAParser} from "ua-parser-js";
import User from '../model/user.model.js'

export const inputUrl = asyncHandler(async (req, res) => {

	if(!req.user._id){
		throw new apiError(401, "Unautherised, please login")
	}
	
	const { url , uniqueCode} = req.body;
	//console.log(uniqueCode)
	if (!url) {
		throw new apiError(400, "enter your url");
	}
     console.log(uniqueCode.trim().length)
	if(uniqueCode.trim().length > 6){
       throw new apiError(400, "length less than 6 chars");
	}

	const validUrl =  urlValidation(url);

	const isUniqueCode = await Url.findOne({urlCode: uniqueCode})
	if(isUniqueCode){
		throw new apiError(400, "please choose unique name");
	}
    
	let urlCode
	if(!uniqueCode) {
      urlCode = nanoid(6);
	} else urlCode = uniqueCode

	let shortUrl = `${process.env.BASE_URL}${urlCode}`;

	const saveUrl = await Url.create({
		user: new mongoose.Types.ObjectId(req.user._id),
		url,
		urlCode,
		shortUrl,
	});

	if (!saveUrl) {
		throw new apiError(400, "something went wrong");
	}
	//console.log(saveUrl);
	return res
		.status(201)
		.json(new apiResponse(201, saveUrl, "Short URL created successfully"));
});


export const redirectUrl = asyncHandler(async (req ,res )=> {

	const {code} = req.params
	//console.log("code ", code)
    if(!code){
		throw new apiError(400, "wrong url")
	}

	const urlData = await Url.aggregate([
		{
			$match: {
				urlCode: code, 
			}
		},	
		{
			$project: {
				_id: 1,
				url: 1,
				user: 1,
				isActive: 1
			}
		}	
	])

	if(urlData.length === 0){
		throw new apiError(404, "url no found")
	}

		const user = await Url.findOneAndUpdate({urlCode: code}, 
	  { $inc: { totalClicksOnUrl: 1 } },       // Increments the 'totalClicks' field by exactly 1
      { new: true} 
	 )
	

    res.redirect(302, urlData[0].url)  
 
	const result = UAParser(req.headers["user-agent"]);
	const ip =
	req.headers["x-forwarded-for"] ||
	req.socket.remoteAddress;

	const clickedData = await Click.create({
		url: new mongoose.Types.ObjectId(urlData[0]._id),
		browser: result.browser.name,
		device: os.type(),
		ip
	}) 
})