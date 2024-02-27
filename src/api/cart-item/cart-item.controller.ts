import { NextFunction, Request, Response } from 'express'
import productService from '../product/product.service'
import { CartItem } from './cart-item.entity'
import cartItemService, { CART } from './cart-item.service'

export const list = async (_req: Request, res: Response, _next: NextFunction) => {
  res.send(CART)
}

export const add = async (req: Request, res: Response, _next: NextFunction) => {
  const { productId, quantity } = req.body

  const product = await productService.getById(productId)
  if (!product) {
    res.sendStatus(404)
    return
  }

  const newItem: CartItem = {
    product: productId,
    quantity,
  }

  const saved = await cartItemService.add(newItem)

  res.json(saved)
}

export const update = async (req: Request, res: Response, _next: NextFunction) => {
  const { productId, newQuantity } = req.body

  const product = await productService.getById(productId)
  if (!product) {
    res.sendStatus(404)
    return
  }

  const updatedItem = await cartItemService.update(productId, newQuantity)

  res.json(updatedItem)
}

export const remove = async (_req: Request, _res: Response, _next: NextFunction) => {}
