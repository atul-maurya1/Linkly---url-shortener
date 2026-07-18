import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import errorHandler from './middleware/error.middleware.js'
import morgan from 'morgan'

const app = express()
 
app.use(
  cors({
    origin: [
      "https://linkly1-gold.vercel.app",
      "http://localhost:5173"
    ],
    credentials: true
  })
);

app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.json())


app.use(morgan('dev')) 

//Routes
import urlRouter from './routes/url.routes.js'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import redirectRouter from './routes/redirect.routes.js'

app.use('/api/v1/url', urlRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use(redirectRouter)

app.use(errorHandler)

export default app 