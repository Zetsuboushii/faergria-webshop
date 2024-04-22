<template>
  <v-navigation-drawer
    location="right"
    permanent
    class="cart"
  >
    <v-container class="text-h4">Your Cart</v-container>
    <v-divider></v-divider>
    <v-col v-for="item in cartItems" :key="item.item_id">
      <CartItem :item="item"/>
    </v-col>
    <div v-if="cartItems.length > 0">
      <v-divider></v-divider>
      <v-container>Total amount: {{ total.toFixed(2) }}€</v-container>
      <v-btn
        class="checkout-btn"
        @click="checkout = true"
      >Checkout
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import Cookies from "js-cookie";
import {onMounted, ref} from "vue";
import CartItem from "@/components/CartItemCard.vue";

interface Item {
  item_id: string
  item_name: string
  category_name: string
  collection_name: string
  price: number
  quantity: number
}

const cartItems = ref<Item[]>([])
const total = ref<number>(0)
const checkout = ref<boolean>(false)

const getCart = async () => {
  let cookie = Cookies.get("cart")
  let cart: any[] = []
  let itemCounts: { [item: string]: number } = {}

  if (cookie) {
    cart = cookie.split(",")

    cart.forEach(item => {
      itemCounts[item] = (itemCounts[item] || 0) + 1
    })

    try {
      const response = await fetch("http://localhost:1337/items")
      const data = await response.json()
      cartItems.value = data.data

      cartItems.value.forEach(item => item.quantity = itemCounts[item.item_id] || 0)

      cartItems.value = cartItems.value.filter(item => cart.includes(item.item_id))

      total.value = 0
      cartItems.value.forEach(item => {
        total.value = total.value + (item.quantity * item.price)
      })
    } catch (error) {
      console.error("Ein Fehler ist aufgetreten: ", error)
    }
  }
}

onMounted(() => {
  getCart()
  setInterval(() => {
    const currentCart = Cookies.get("cart")
    if (currentCart !== localStorage.lastCart || currentCart != "") {
      getCart()
      localStorage.lastCart = currentCart
    }
  }, 1000)
})
</script>

<style scoped>
.checkout-btn {

}
</style>
