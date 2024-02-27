import { NextFunction, Request, Response } from 'express'
import productSrv from './product.service'

export const list = async (req: Request, res: Response, _next: NextFunction) => {
  const { search }: { search?: string } = req.query
  const result = await productSrv.find(search)
  res.json(result)
}

export const detail = async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params
  const item = await productSrv.getById(id)
  if (!item) {
    res.status(404)
    res.send('Product not found')
  }
  res.json(item)
}
