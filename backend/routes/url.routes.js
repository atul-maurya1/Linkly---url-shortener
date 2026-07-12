import express from 'express'

const urlRouter = express.Router()

import {inputUrl, redirectUrl} from '../controller/url.controller.js'
import {verifyJWT} from '../middleware/auth.middleware.js'

urlRouter.post('/take-url', verifyJWT, inputUrl)
urlRouter.get('/:code', redirectUrl)


export default urlRouter