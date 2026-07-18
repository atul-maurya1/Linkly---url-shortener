import express from 'express'

const urlRouter = express.Router()

import {inputUrl} from '../controller/url.controller.js'
import {verifyJWT} from '../middleware/auth.middleware.js'

urlRouter.post('/take-url', verifyJWT, inputUrl)


export default urlRouter