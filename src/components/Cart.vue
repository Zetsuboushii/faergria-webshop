<template>
  <v-navigation-drawer
    location="right"
    permanent
    class="cart"
  >
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
import {ref} from "vue";

const cart = ref()
</script>

<style scoped>
.cart {
  z-index: 90 !important;
  width: 300px;
}
</style>
