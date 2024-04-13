<template>
  <div>
    <div v-if="selectedCategory == null || selectedCategory == 'HOME'">
      <CategoryHeader :selectedCategory="selectedCategory"/>
    </div>
    <div v-if="selectedCategory != null && selectedCategory == 'ITEMS'">
      <CategoryHeader :selectedCategory="selectedCategory"/>
    </div>
    <div v-if="selectedCategory != null && checkCategories()">
      <CategoryHeader :selectedCategory="'ITEMS/' + selectedCategory.category_name"/>
      <ItemGrid :selectedCategory="selectedCategory" class="item-grid"/>
    </div>
    <div v-if="selectedCategory != null && selectedCategory == 'ABOUT'">
      <CategoryHeader :selectedCategory="selectedCategory"/>
    </div>
    <div v-if="selectedCategory != null && selectedCategory == 'FAQ'">
      <CategoryHeader :selectedCategory="selectedCategory"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemGrid from "@/components/ItemGrid.vue"
import {defineEmits, ref} from "vue"
import CategoryHeader from "@/components/CategoryHeader.vue";

interface Category {
  category_id: number
  category_name: string
}

const props = defineProps(['selectedCategory'])

const emit = defineEmits()
const setCategory = () => {
  emit('category-selected', props.selectedCategory)
}

const checkCategories = () => {
  return ["Apparel", "Books", "Fumo", "Various", "Wall Art"].includes(props.selectedCategory.category_name)
}
</script>

<style scoped>
.category-headline {
  width: 100%;
}

.head-row {
  margin: 0;
  padding: 10px;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
}

.item-grid {
  width: 100%;
  margin: 0;
  padding: 10px;
}
</style>
