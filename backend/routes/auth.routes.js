import express from 'express'

import {userRegestrationValidation, userLoginValidation, changePasswordValidation} from '../validator/index.js'
import {validator} from '../middleware/validator.middleware.js'
import {verifyJWT} from '../middleware/auth.middleware.js'

const authRouter = express.Router()

import {generateAccessTokenAndRefreshToken, 
     userRegister ,
     login, 
     logout, 
     resendOtp, 
     changePassword, 
     verifyEmail,
     getUser,
     forgotPassword,
     verifyOtpForForgotPassword,
     setNewPassword
   } from '../controller/auth.controller.js'

authRouter.post('/register' , userRegestrationValidation(),  validator ,userRegister)
authRouter.post("/verify-email", verifyEmail)
authRouter.post("/login", userLoginValidation(), validator, login)
authRouter.post("/logout", verifyJWT, logout)
authRouter.post("/change-password", verifyJWT, changePasswordValidation(), validator, changePassword)
authRouter.post("/resend-otp" , resendOtp)
authRouter.get('/get-user', verifyJWT, getUser) 

authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/verify-otp', verifyOtpForForgotPassword)
authRouter.post('/new-password', setNewPassword)
 
// authRouter.post("/refresh-token", generateAccessTokenAndRefreshToken)



export default authRouter