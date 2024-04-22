<template>
  <v-card elevation="10" height="auto" width="335">
    <v-card-title class="card-title">{{ item.item_name }}</v-card-title>
    <v-card-subtitle class="card-subtitle">{{ item.collection_name }}</v-card-subtitle>
    <v-divider></v-divider>
    <div class="item-img">
      <v-img :width="300" :max-height="300" v-bind:src="'src/assets/items/' + item.item_id + '.jpg'"></v-img>
    </div>
    <v-container class="item-info">
      <div class="text-h5 item-price">{{ item.price + "€" }}</div>
      <div class="item-stock bg-green-accent-1" v-if="item.stock >= 25">In Stock</div>
      <div class="item-stock bg-yellow-accent-1" v-if="item.stock < 25 && item.stock > 0">Few Left</div>
      <div class="item-stock bg-red-accent-1" v-if="item.stock == 0">Out of Stock</div>
    </v-container>
    <v-card-actions>
      <v-btn
        dark
        fixed
        top
        right
        size="large"
        @click="putIntoCart(item)"
      >
        <v-icon icon="mdi-plus"/>
        Add to Cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">

interface Item {
  item_id: string
  item_name: string
  category_name: string
  collection_name: string
  price: number
  stock: number
}

const props = defineProps(["item"])

const putIntoCart = (item: Item) => {
  let cart: any[] = []

  if (localStorage.cart) {
    cart = localStorage.cart.split(",")
  }

  cart.push(item.item_id)

  localStorage.cart = cart.join(",")
}
</script>

<style scoped>
.card-subtitle {
  margin-top: 0;
  margin-bottom: 10px;
}

.item-img {
  padding: 0;
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.item-info {
  display: flex;
  align-items: center;
}

.item-price {
  width: 60%;
  margin: 0;
}

.item-stock {
  padding: 10px;
  width: 40%;
  text-align: center;
  border-radius: 10px;
}
</style>
