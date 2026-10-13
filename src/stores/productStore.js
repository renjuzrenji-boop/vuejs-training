import { defineStore } from "pinia";

export const useProductStore = defineStore("products", {
  state: () => ({
    products: [
      {
        id: 1,
        name: "Everyday Notebook",
        category: "Paper goods",
        description: "A sturdy, lay-flat notebook for plans and passing thoughts.",
        price: 12,
        image: "/images/everyday-notebook.jpg"
      },
      {
        id: 2,
        name: "Stoneware Cup",
        category: "At home",
        description: "A hand-finished cup made for slow morning coffee.",
        price: 18,
        image: "/images/stoneware-cup.jpg"
      },
      {
        id: 3,
        name: "Pocket Pencils",
        category: "Writing tools",
        description: "A set of six dependable pencils with a soft graphite line.",
        price: 7.5,
        image: "/images/pocket-pencils.jpg"
      },
      {
        id: 4,
        name: "Desk Plant",
        category: "Green things",
        description: "An easy-care plant to bring a little life to your workspace.",
        price: 16,
        image: "/images/desk-plant.jpg"
      },
      {
        id: 5,
        name: "Water Bottle",
        category: "On the go",
        description: "A lightweight bottle with a leak-resistant stainless lid.",
        price: 24,
        image: "/images/water-bottle.jpg"
      }
    ]
  }),

  getters: {
    productCount: (state) => state.products.length
  },

  actions: {
    getProductById(productId) {
      return this.products.find((product) => product.id === productId);
    }
  }
});