import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { list, detail } from './api/product/product.controller'
import { list as cartItemList, add, updateQuantity } from './api/cart-item/cart-item.controller'

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.get('/products', list)

app.get('/products/:id', detail)

app.get('/cart-items', cartItemList)

app.post('/cart-items', add)

app.patch('/cart-items', updateQuantity)

export default app
