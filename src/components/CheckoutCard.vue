<template>
  <v-card
    width="600"
    height="500"
    title="Cart Overview"
  >
    <v-divider class="ma-5"></v-divider>
    <v-list-item v-for="item in cartItems" :key="item.item_id">
      {{ item.quantity + "x " + item.item_name }}
    </v-list-item>
    <v-divider class="ma-5"/>
    <div class="ma-5">
      <p>Items: {{ (total - (total * 0.19)).toFixed(2) }}€</p>
      <p>MwSt: {{ (total * 0.19).toFixed(2) }}€</p>
      <p>Gesamt: {{ total }}€</p>
    </div>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps(["cartItems", "total"])
</script>

<style scoped>

</style>
