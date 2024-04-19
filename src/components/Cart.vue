<template>
  <v-navigation-drawer
    location="right"
    permanent
    class="cart"
  >
    <v-list density="compact" nav>
      <v-list-item v-for="item in items" :key="item.item_id">
        <v-card>
          {{ item.item_name }}
          {{item.quantity}}
        </v-card>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import Cookies from "js-cookie";
import {onMounted, ref} from "vue";

interface Item {
  item_id: string
  item_name: string
  category_name: string
  collection_name: string
  price: number
  quantity: number
}

const items = ref<Item[]>([])

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
      items.value = data.data

      items.value.forEach(item => item.quantity = itemCounts[item.item_id] || 0)

      items.value = items.value.filter(item => cart.includes(item.item_id))
    } catch (error) {
      console.error("Ein Fehler ist aufgetreten: ", error)
    }
  }
}

onMounted(getCart)
</script>

<style scoped>
.cart {
  z-index: 90 !important;
  width: 300px;
}
</style>
