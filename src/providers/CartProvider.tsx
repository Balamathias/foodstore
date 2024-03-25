import React, { ReactNode, createContext, useContext, useState } from 'react'
import { CartItem, Product } from '../app/types'
import { randomUUID } from 'expo-crypto'

export const CartContext = createContext<{
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void,
    updateQuantity: (cartItemId: string, qty: number) => void,
    total: number
}>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
    total: 0.00
})

const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([])
    const total = items.reduce((sum, acc) => sum += (acc.product.price * acc.quantity), 0)

    
    const addItem = (product: Product, size: CartItem['size']) => {
        const existingItem = items.find(item => item.product === product && item.size === size) 

        if (existingItem) {
            updateQuantity(existingItem.id, 1)
            return
        }

        const newCartItem: CartItem = {
            id: randomUUID(),
            product_id: product?.id,
            product: product,
            quantity: 1,
            size
        }
        setItems([newCartItem, ...items])
    }

    const updateQuantity = (cartItemId: string, qty: number) => {
        setItems(
            items.map(item => item.id !== cartItemId ? item : {...item, quantity: item.quantity + qty})
            .filter(item => item.quantity > 0)
        )
    }
  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>{children}</CartContext.Provider>
  )
}

export default CartProvider

export const useCart = () => useContext(CartContext)