import cartItemRouter from './cart-item/cart-item.router'
import express from 'express'
import productRouter from './product/product.router'

const router = express.Router()

router.use('/cart-items', cartItemRouter)
router.use('/products', productRouter)

export default router
