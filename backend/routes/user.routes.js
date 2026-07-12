import express from 'express'


import {verifyJWT} from '../middleware/auth.middleware.js'

const userRouter = express.Router()


import {dashboard, urlClickData, getUser} from '../controller/user.controller.js'

userRouter.get('/dashboard',verifyJWT, dashboard)
userRouter.get('/url/:id', verifyJWT, urlClickData)
userRouter.get('/get-user', verifyJWT, getUser)


export default userRouter