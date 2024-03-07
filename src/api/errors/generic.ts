import { Request, Response, NextFunction } from 'express'

export const genericHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  res.status(500)
  res.json({
    error: 'InteralServerError',
    message: 'The server encountered an internal error'
  })
}
