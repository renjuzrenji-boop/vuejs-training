import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: []
  }),

  getters: {
    cartCount: (state) => state.items.reduce((count, item) => count + item.quantity, 0),
    cartTotal: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  actions: {
    addToCart(product) {
      const cartItem = this.items.find((item) => item.id === product.id);

      if (cartItem) {
        cartItem.quantity += 1;
        return;
      }

      this.items.push({ ...product, quantity: 1 });
    },

    removeFromCart(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
    },

    increaseQuantity(productId) {
      const cartItem = this.items.find((item) => item.id === productId);
      if (cartItem) {
        cartItem.quantity += 1;
      }
    },

    decreaseQuantity(productId) {
      const cartItem = this.items.find((item) => item.id === productId);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      }
    },

    clearCart() {
      this.items = [];
    }
  }
});