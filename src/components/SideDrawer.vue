<template>
  <div class="side-drawer">
    <div v-if="cartOpened">
      <Cart class="cart-drawer"/>
    </div>
    <v-btn
      dark
      fixed
      top
      right
      size="x-large"
      @click="openCart"
      class="button cart-button"
      :class="{ open: cartOpened }"
    >
      <v-icon icon="mdi-cart"/>
    </v-btn>
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      size="x-large"
      @click="toTop"
      class="button gtt-button"
      :class="{ open: cartOpened }"
    >
      <v-icon icon="mdi-arrow-up"/>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, ref} from "vue"
import Cart from "@/components/Cart.vue"

const props = defineProps(["cart"])

const cartOpened = ref(false)
const fab = ref<boolean>(false)

const openCart = () => {
  cartOpened.value = !cartOpened.value
}

const onScroll = (e: Event) => {
  if (typeof window === "undefined") return
  const target = e.target as EventTarget & { scrollTop?: number }
  const top = window.pageYOffset || target.scrollTop || 0
  fab.value = top > 20
}

const toTop = () => {
  // const app = getCurrentInstance()?.appContext.app
  // const vuetify = app?.config.globalProperties.$vuetify
  window.scrollTo({top: 0, behavior: "smooth"})
}

const emit = defineEmits()
emit("cart", props.cart)
</script>

<style scoped>
.side-drawer {
  position: fixed;
  right: 0;
  height: 100%;
  width: 50%;
  align-content: end;
  justify-items: right;
  z-index: 100;
  transition: right 0.3s;
}

.cart-drawer {
  height: 100%;
}

.button.open {
  right: 280px;
}

.button {
  position: fixed;
  right: 20px;
  z-index: 100;
  width: 75px;
  height: 75px;
  border-radius: 5px;
  color: white;
  background-color: turquoise;
  transition: right 0.3s;
}

.gtt-button {
  bottom: 20px;
}

.cart-button {
  top: 20px;
}
</style>
