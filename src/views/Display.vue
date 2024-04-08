<template>
  <v-container>
    <ItemGrid class="item-grid"/>
  </v-container>
</template>

<script setup lang="ts">

import ItemGrid from "@/components/ItemGrid.vue";
</script>

<style scoped>
.item-grid {
  width: 100%;
  margin: 0;
  padding: 10px;
}
</style>
