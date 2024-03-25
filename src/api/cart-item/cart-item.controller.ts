import cartItemService from './cart-item.service'
import productService from '../product/product.service'
import { CartItem } from './cart-item.entity'
import { json, NextFunction, Request, Response } from 'express'
import { NotFoundError } from '../errors/not-found'

export const list = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await cartItemService.list()
    res.json(items)
  } catch (err) {
    next(err)
  }
}

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, quantity } = req.body

    const product = await productService.getById(productId)
    if (!product) {
      throw new NotFoundError()
    }

    const newItem: CartItem = {
      product: productId,
      quantity
    }

    const saved = await cartItemService.add(newItem)
    res.json(saved)
  } catch (err) {
    next(err)
  }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await cartItemService.getById(req.params.id)
    if (!product) {
      throw new NotFoundError()
    }

    const saved = await cartItemService.remove(product)
    res.json(saved)
  } catch (err) {
    next(err)
  }
}

export const updateQuantity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { quantity } = req.body
    const { id } = req.params

    const updated = await cartItemService.update(id, { quantity })
    res.json(updated)
  } catch (err) {
    next(err)
  }
}
