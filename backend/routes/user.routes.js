import express from 'express'


import {verifyJWT} from '../middleware/auth.middleware.js'

const userRouter = express.Router()


import {dashboard, totalUrls, deleteUrl} from '../controller/user.controller.js'

userRouter.get('/dashboard',verifyJWT, dashboard)
userRouter.delete('/delete-url/:id', verifyJWT, deleteUrl)
userRouter.get('/urls',verifyJWT, totalUrls)


export default userRouter