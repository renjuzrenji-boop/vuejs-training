<template>
  <section class="grid gap-6" aria-labelledby="pinia-cart-title">
    <header class="flex flex-col items-start justify-between gap-4 border-b border-[#dce2d9] pb-5 sm:flex-row sm:items-end">
      <div>
        <p class="mb-2 text-[10px] font-bold tracking-[1.1px] text-[#61776a]">PINIA · SHARED STATE</p>
        <h1 id="pinia-cart-title" class="font-serif text-3xl font-normal text-[#25342c]">Shopping cart store</h1>
        <p class="mt-2 text-sm text-[#707b73]">{{ productStore.productCount }} products · cart state is managed by Pinia.</p>
      </div>
      <div class="flex items-baseline gap-3 sm:grid sm:gap-1 sm:text-right" aria-live="polite">
        <span class="text-[11px] text-[#78827a]">{{ cartStore.cartCount }} items</span>
        <strong class="font-serif text-[25px] font-normal text-[#32634f]">{{ formatPrice(cartStore.cartTotal) }}</strong>
      </div>
    </header>

    <div class="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <section aria-labelledby="pinia-products-title">
        <div class="mb-3.5 flex items-center justify-between gap-3.5">
          <h2 id="pinia-products-title" class="m-0 font-serif text-[22px] font-normal text-[#25342c]">The collection</h2>
          <span class="text-[11px] text-[#78827a]">{{ productStore.productCount }} products</span>
        </div>
        <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <article v-for="product in productStore.products" :key="product.id" class="overflow-hidden rounded-md border border-[#e1e5de] bg-white">
            <img class="block aspect-[1.65] w-full bg-[#e8ebe5] object-cover" :src="product.image" :alt="product.name" loading="lazy" />
            <div class="p-3.5">
              <p class="mb-[5px] text-[10px] font-bold uppercase tracking-[0.7px] text-[#a35b3c]">{{ product.category }}</p>
              <h3 class="m-0 text-sm font-semibold text-[#25342c]">{{ product.name }}</h3>
              <p class="my-2 min-h-9 text-xs leading-[1.5] text-[#768078]">{{ product.description }}</p>
              <div class="flex items-center justify-between gap-3.5">
                <strong class="text-[13px] text-[#25342c]">{{ formatPrice(product.price) }}</strong>
                <button
                  type="button"
                  class="min-h-8 rounded border border-[#32634f] bg-[#32634f] px-3 text-[11px] font-semibold text-white hover:bg-[#295440] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c36a4c]"
                  @click="cartStore.addToCart(product)"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <aside class="rounded-md border border-[#e1e5de] bg-white p-5" aria-labelledby="pinia-cart-panel-title">
        <header class="mb-3.5 flex items-center justify-between gap-3.5">
          <h2 id="pinia-cart-panel-title" class="m-0 font-serif text-[22px] font-normal text-[#25342c]">Your cart</h2>
          <button
            v-if="cartStore.items.length"
            type="button"
            class="border-0 bg-transparent text-[11px] text-[#a35b3c] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c36a4c]"
            @click="cartStore.clearCart()"
          >
            Clear cart
          </button>
        </header>

        <p v-if="cartStore.items.length === 0" class="m-0 py-3 text-xs text-[#768078]">Your cart is empty.</p>
        <ul v-else class="m-0 list-none p-0">
          <li v-for="item in cartStore.items" :key="item.id" class="grid grid-cols-[minmax(0,1fr)_auto] gap-2.5 border-t border-[#edf0ec] py-3.5">
            <div class="grid min-w-0 gap-[5px]">
              <strong class="text-xs text-[#29342d]">{{ item.name }}</strong>
              <span class="text-[11px] text-[#849087]">{{ formatPrice(item.price) }} each</span>
            </div>
            <div class="flex items-center gap-[5px]">
              <button
                type="button"
                class="h-8 w-[30px] rounded border border-[#dce2d9] bg-white px-0 text-[15px] font-semibold text-[#32634f] disabled:cursor-not-allowed disabled:text-[#b8c0b9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c36a4c]"
                :aria-label="`Decrease ${item.name} quantity`"
                :disabled="item.quantity === 1"
                @click="cartStore.decreaseQuantity(item.id)"
              >
                −
              </button>
              <span class="min-w-[18px] text-center text-xs text-[#25342c]" :aria-label="`Quantity ${item.quantity}`">{{ item.quantity }}</span>
              <button
                type="button"
                class="h-8 w-[30px] rounded border border-[#dce2d9] bg-white px-0 text-[15px] font-semibold text-[#32634f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c36a4c]"
                :aria-label="`Increase ${item.name} quantity`"
                @click="cartStore.increaseQuantity(item.id)"
              >
                +
              </button>
              <button
                type="button"
                class="ml-1 h-8 w-auto border-0 bg-transparent px-0.5 text-[10px] text-[#a35b3c] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c36a4c]"
                :aria-label="`Remove ${item.name} from cart`"
                @click="cartStore.removeFromCart(item.id)"
              >
                Remove
              </button>
            </div>
            <strong class="col-span-full justify-self-end text-xs text-[#25342c]">{{ formatPrice(item.price * item.quantity) }}</strong>
          </li>
        </ul>

        <footer class="mt-1.5 flex items-center justify-between gap-3.5 border-t border-[#dce2d9] pt-4 text-[13px] text-[#25342c]">
          <span>Total</span>
          <strong class="text-base">{{ formatPrice(cartStore.cartTotal) }}</strong>
        </footer>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from "../stores/cartStore.js";
import { useProductStore } from "../stores/productStore.js";

const cartStore = useCartStore();
const productStore = useProductStore();

function formatPrice(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}
</script>