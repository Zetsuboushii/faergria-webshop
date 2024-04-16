<template>
  <v-navigation-drawer
    location="right"
    permanent
    class="cart"
  >
    <template v-slot:prepend>
      <v-list-item
        lines="two"
        prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
        subtitle="Logged In"
        title="U-Ranossi Knecht"
      ></v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in cart"
        :key="item"
        prepend-icon="mdi-home-city"
        :title="item"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import {defineEmits, ref} from "vue"

const props = defineProps(["cart"])

const loggedIn = ref<boolean>(true)

const emit = defineEmits()
emit("cart", props.cart)
</script>

<style scoped>
.cart {
  z-index: 90 !important;
  width: 300px;
}
</style>
