import express from 'express'
import cartItemRouter from './cart-item/cart-item.router'

const router = express.Router()

router.use('/cart', cartItemRouter)

router.use('/product/:id', reviewRouter)

router.use('/vendor/:id', reviewRouter)

export default router
