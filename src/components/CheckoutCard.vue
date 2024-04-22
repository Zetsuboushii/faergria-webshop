<template>
  <v-card
    width="600"
    height="500"
    title="Checkout"
  >
    <v-divider class="ma-5"></v-divider>
    <v-list-item v-for="item in cartItems" :key="item.item_id">
      {{ item.item_name + " " + item.quantity }}
    </v-list-item>
    {{ total }}
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps(["cartItems", "total"])
</script>

<style scoped>

</style>
