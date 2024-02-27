import { NextFunction, Request, Response } from 'express'
import productService from '../product/product.service'
import cartItemService from './cart-item.service'
import { CartItem } from './cart-item.entity'

export const list = async (_req: Request, res: Response, _next: NextFunction) => {
  const items = await cartItemService.list()
  res.json(items)
}

export const add = async (req: Request, res: Response, _next: NextFunction) => {
  const { productId, quantity } = req.body

  const product = await productService.getById(productId)
  if (!product) {
    res.send(404)
    return
  }

  const newItem: CartItem = {
    product: productId,
    quantity,
  }

  const saved = await cartItemService.add(newItem)

  res.json(saved)
}

export const updateQuantity = async (req: Request, res: Response, _next: NextFunction) => {
  const { quantity } = req.body
  const { id } = req.params

  const updated = await cartItemService.update(id, { quantity })

  res.json(updated)
}

export const remove = async (_req: Request, _res: Response, _next: NextFunction) => {}
