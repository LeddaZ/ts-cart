import { CartItem } from './cart-item.entity'
import { CartItemModel } from './cart-item.model'
import { NotFoundError } from '../errors/not-found'

export class CartItemService {
  async list(): Promise<CartItem[]> {
    return CartItemModel.find().populate('product')
  }

  async getById(id: string): Promise<CartItem | null> {
    const item = await CartItemModel.findById(id).populate('product')
    if (!item) {
      return null
    }
    return item
  }

  async add(item: CartItem): Promise<CartItem> {
    const existing = await CartItemModel.findOne({ product: item.product })

    if (existing) {
      return this.update(existing.id, {
        quantity: existing.quantity + item.quantity
      })
    }

    const newItem = await CartItemModel.create(item)
    return (await this.getById(newItem.id))!
  }

  async remove(item: CartItem): Promise<CartItem> {
    const existing = await CartItemModel.findOne({ product: item.product })
    let del = null
    if (existing) {
      del = await CartItemModel.findByIdAndDelete(existing.id)
    }
    return del!
  }

  async update(id: string, data: Partial<Omit<CartItem, 'id' | 'product'>>): Promise<CartItem> {
    const existing = await CartItemModel.findById(id)
    if (!existing) {
      throw new NotFoundError()
    }

    Object.assign(existing, data)
    await existing.save()
    const updated = await this.getById(id)
    return updated!
  }
}

export default new CartItemService()
