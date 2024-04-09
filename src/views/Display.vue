<template>
  <v-container>
    <ItemGrid :selectedCategory="selectedCategory" class="item-grid"/>
  </v-container>
</template>

<script setup lang="ts">
import ItemGrid from "@/components/ItemGrid.vue";
import {defineEmits} from "vue";

const props = defineProps(['selectedCategory']);
const emit = defineEmits();
const selectCategory = (category: any) => {
  emit('category-selected', category)
}
</script>

<style scoped>
.item-grid {
  width: 100%;
  margin: 0;
  padding: 10px;
}
</style>
