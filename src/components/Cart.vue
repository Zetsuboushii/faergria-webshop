<template>
  <v-navigation-drawer
    location="right"
    permanent
    class="cart"
  >
    <v-list density="compact" nav>
      <v-list-item
        v-for="(item, i) in getCart()"
        :key="i"
        prepend-icon="mdi-home-city"
        :title="item.item_name"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import Cookies from "js-cookie";
import {ref} from "vue";

interface Item {
  item_id: string
  item_name: string
  category_name: string
  collection_name: string
  price: number
  amount: number
}

const items = ref<Item[]>([])

const getCart = async () => {
  let cookie = Cookies.get("cart")
  let cart: any[] = []

  if (cookie) {
    cart = cookie.split(",")
  }

  try {
    const response = await fetch("http://localhost:1337/items")
    const data = await response.json()
    items.value = data.data

    items.value = items.value.filter(item => cart.includes(item.item_id))
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error)
  }
}
</script>

<style scoped>
.cart {
  z-index: 90 !important;
  width: 300px;
}
</style>
