import express from 'express'


import {verifyJWT} from '../middleware/auth.middleware.js'

const userRouter = express.Router()


import {dashboard, urlClickData, getUser, totalUrls} from '../controller/user.controller.js'

userRouter.get('/dashboard',verifyJWT, dashboard)
userRouter.get('/url/:id', verifyJWT, urlClickData)
userRouter.get('/get-user', verifyJWT, getUser)
userRouter.get('/urls',verifyJWT, totalUrls)


export default userRouter