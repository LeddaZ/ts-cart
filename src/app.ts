import apiRouter from './api/routes'
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { list, detail } from './api/product/product.controller'

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.get('/products', list)

app.get('/products/:id', detail)

app.use(apiRouter)

export default app
