<template>
  <v-card
    elevation="10"
    v-bind:image="'src/assets/items/' + item.item_id + '.jpg'"
    class="cart-item"
    color="surface-variant"
  >
    <div class="cart-item-overlay"></div>
    <div class="cart-item-content">
      <v-container class="cart-item-title">{{ item.item_name }}</v-container>
      <div class="cart-item-misc">
        <div class="cart-item-buttons">
          <v-btn
            color="green-lighten-2"
            variant="tonal"
            class="cart-item-btn-count"
            @click="putIntoCart(item)"
          >
            <v-icon icon="mdi-plus"/>
          </v-btn>
          {{ item.quantity }}
          <v-btn
            color="red-lighten-2"
            text="-"
            variant="tonal"
            class="cart-item-btn-count"
            @click="removeFromCart(item)"
          >
            <v-icon icon="mdi-minus"/>
          </v-btn>
        </div>
        <div class="cart-item-price">{{ (item.price * item.quantity).toFixed(2) + '€' }}</div>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
interface Item {
  item_id: string
  item_name: string
  category_name: string
  collection_name: string
  price: number
  quantity: number
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

const removeFromCart = (item: Item) => {
  if (localStorage.cart) {
    localStorage.cart = localStorage.cart.replace(new RegExp(`(${item.item_id},?|,${item.item_id})`), '')
    if (localStorage.cart == "") {
      localStorage.cart = ","
    }
  }
}
</script>

<style scoped>
.cart-item {
  position: relative;
}

.cart-item .cart-item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.cart-item .cart-item-title {
  font-size: large;
  font-weight: bold;
}

.cart-item .cart-item-content {
  position: relative;
  z-index: 2;
}

.cart-item .cart-item-misc {
  display: flex;
  align-items: center;
  padding: 10px;
}

.cart-item .cart-item-price {
  width: 40%;
  text-align: right;
}

.cart-item .cart-item-buttons {
  width: 60%;
}

.cart-item-btn-count {
  min-width: 10px;
  width: auto;
}
</style>
