import express from 'express'


const redirectRouter = express.Router()

import {redirectUrl} from '../controller/url.controller.js'

redirectRouter.get('/:code', redirectUrl)

export default redirectRouter
