import { create } from "zustand"
import { persist } from "zustand/middleware"


export type Ticket = {
  id: string    //ticket id
  title: string
  eventId: number
  price: number
  image: string
  ticketHolderName?: string
}

export type CartItem = {
  name: string
  image: string
  id: string // order id
  price: number, // total price of the tickets
  eventId: number
  quantity: number,
  Tickets: Ticket[]
}

export type CartState = {
  cart: CartItem[]
  checkoutProgress: "cart-page" | "ticket-info" | "payment-page" | "confirmation-page"
  setCheckoutProgress: (
    val: "cart-page" | "ticket-info" | "payment-page" | "confirmation-page"
  ) => void
  addToCart: (item: CartItem) => void
  removeFromCart: (item: CartItem) => void
  clearCart: () => void
  cartOpen: boolean
  setCartOpen: (val: boolean) => void
  updateTicketHolderName: (ticketId: string, name: string) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      cartOpen: false,
      setCartOpen: (val) => set({ cartOpen: val }),
      clearCart: () => set({ cart: [] }),
      checkoutProgress: "cart-page",
      setCheckoutProgress: (val) => set(() => ({ checkoutProgress: val })),
      updateTicketHolderName: (ticketId, name) =>
        set((state) => {
          const updatedCart = state.cart.map((cartItem) => {
            const updatedTickets = cartItem.Tickets.map((ticket) =>
              ticket.id === ticketId ? { ...ticket, ticketHolderName: name } : ticket
            )
            return { ...cartItem, Tickets: updatedTickets }
          })
          return { cart: updatedCart }
        }),
      addToCart: (item) =>
        set((state) => {

          const tickets = Array.from({ length: item.quantity }, () => ({
            id: crypto.randomUUID(),
            ticketHolderName: "",
            title: item.name,
            eventId: item.eventId,
            price: item.price,
            image: item.image
          }))
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          )
          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return {
                  ...cartItem,
                  quantity: cartItem.quantity + item.quantity,
                  Tickets: [...cartItem.Tickets, ...tickets],
                }
              }
              return cartItem
            })
            return { cart: updatedCart }
          } else {
            return {
              cart: [
                ...state.cart,
                {
                  ...item,
                    quantity: item.quantity,
                    Tickets: tickets,
                },
              ],
            }
          }
        }),
      removeFromCart: (item) =>
        set((state) => {

          const updatedCart = state.cart.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
                Tickets: cartItem.Tickets.slice(0, -1),
              }
            }
            return cartItem
          })
          return {
            cart: updatedCart.filter((item) => item.quantity > 0),
          }
        }),
    }),
    
    { name: "cart-storage" }
  )
)