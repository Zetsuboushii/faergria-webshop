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
      <v-row justify="center">
        <v-btn
          color="blue-lighten-2"
          variant="outlined"
          @click="checkout = true"
        >
          <v-icon icon="mdi-cart-arrow-right"></v-icon>
          Checkout
        </v-btn>
      </v-row>
    </div>
    <v-dialog
      v-model="checkout"
      width="auto"
    >
      <CheckoutCard :cartItems="cartItems" :total="total"/>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import CartItem from "@/components/CartItemCard.vue";
import CheckoutCard from "@/components/CheckoutCard.vue";
import {API_URL} from "@/apiUrl";

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

const fetchCart = async () => {
  let cart: any[] = []
  let itemCounts: { [item: string]: number } = {}

  if (localStorage.cart) {
    cart = localStorage.cart.split(",")

    cart.forEach(item => {
      itemCounts[item] = (itemCounts[item] || 0) + 1
    })

    try {
      const response = await fetch(API_URL + "/items")
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
  fetchCart()
  setInterval(() => {
    const currentCart = localStorage.cart
    if (currentCart !== localStorage.lastCart || currentCart != "") {
      fetchCart()
      localStorage.lastCart = currentCart
    }
  }, 1000)
})
</script>

<style scoped>

</style>
