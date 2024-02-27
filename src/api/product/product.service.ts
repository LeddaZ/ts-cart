import PRODUCTS from '../../../products.json'
import { Product } from './product.entity'

export class ProductService {
  async find(search?: string): Promise<Product[]> {
    let result = PRODUCTS

    if (search) {
      result = PRODUCTS.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase())
      })
    }

    return result
  }

  async getById(id: string): Promise<Product | undefined> {
    return PRODUCTS.find((item) => {
      return item.id === id
    })
  }
}

export default new ProductService()
