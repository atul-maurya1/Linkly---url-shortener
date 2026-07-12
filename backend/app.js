import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import errorHandler from './middleware/error.middleware.js'

const app = express()
 
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.json())

//Routes
import urlRouter from './routes/url.routes.js'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'

app.use('/api/v1/url', urlRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)

app.use(errorHandler)

export default app 