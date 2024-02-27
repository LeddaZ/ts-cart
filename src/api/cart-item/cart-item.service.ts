import productService from '../product/product.service'
import { CartItem } from './cart-item.entity'

export const CART: CartItem[] = []

export class CartItemService {
  async add(item: CartItem) {
    const existing = CART.find((element) => element.product === item.product)

    if (existing) {
      return this.update(existing.id!, {
        quantity: existing.quantity + item.quantity,
      })
    }

    const toAdd = {
      ...item,
    }

    CART.push(toAdd)

    return this.getById(toAdd.id)
  }

  async update(id: string, data: Partial<Omit<CartItem, 'id' | 'product'>>) {
    const existing = await this.getById(id)

    if (!existing) {
      return null
    }

    Object.assign(existing, data)

    return existing
  }

  async getById(id: string) {
    const item = CART.find((element) => element.id === id)
    if (!item) {
      return null
    }

    const product = await productService.getById(item.product)
    return this.populateCartItem
  }

  async populateCartItem(item: CartItem) {}
}

export default new CartItemService()
