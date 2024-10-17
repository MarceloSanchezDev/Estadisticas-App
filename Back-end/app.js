import express, { json } from 'express'
import cors from 'cors'
import { statsRouter } from './routes/stats.js'
import { authRouter } from './routes/auth.js'
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware.js'

export const app = express()
app.disable('x-powered-by')
app.use(express.static('dist'))
app.use(cors())
app.use(json())
app.use(requestLogger)
app.use('/stats', statsRouter)
app.use('/auth', authRouter)
app.use(unknownEndpoint)
app.use(errorHandler)
