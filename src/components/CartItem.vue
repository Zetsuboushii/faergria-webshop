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
      Quantity: {{ item.quantity }}
      Price: {{ (item.price * item.quantity).toFixed(2) + '€' }}
      <div class="cart-btn-container">
        <v-btn
          color="gray-lighten-2"
          text="+"
          variant="tonal"
          class="cart-item-btn-count"
        ></v-btn>
        <v-btn
          color="gray-lighten-2"
          text="-"
          variant="tonal"
          class="cart-item-btn-count"
        ></v-btn>
        <v-btn
          color="red-lighten-2"
          text="Remove"
          variant="tonal"
          class="cart-item-btn-remove"
        ></v-btn>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps(["item"])
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

.cart-item .cart-btn-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px
}

.cart-item-btn-count {
  min-width: 10px;
  width: 20%;
  margin-right: 5px;
}

.cart-item-btn-remove {
  min-width: 10px;
  width: 55%;
}
</style>
