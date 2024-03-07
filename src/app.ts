import apiRouter from './api/routes'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { errorHandlers } from './api/errors'

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.use('/api', apiRouter)

app.use(errorHandlers)

export default app
