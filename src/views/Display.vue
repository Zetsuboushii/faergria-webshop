<template>
  <div>
    <div v-if="selectedCategory == null || selectedCategory == 'HOME'">
      <CategoryHeader :selectedCategory="'HOME'"/>
      <Home/>
    </div>
    <div v-if="selectedCategory != null && checkCategories()">
      <CategoryHeader :selectedCategory="'ITEMS/' + selectedCategory.category_name"/>
      <ItemGrid :selectedCategory="selectedCategory" class="item-grid"/>
    </div>
    <div v-if="selectedCategory != null && selectedCategory == 'ABOUT'">
      <CategoryHeader :selectedCategory="selectedCategory"/>
      <About/>
    </div>
    <div v-if="selectedCategory != null && selectedCategory == 'FAQ'">
      <CategoryHeader :selectedCategory="selectedCategory"/>
      <FAQ/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemGrid from "@/components/ItemGrid.vue"
import {defineEmits, ref} from "vue"
import CategoryHeader from "@/components/CategoryHeader.vue";
import Home from "@/components/Home.vue";
import About from "@/components/About.vue";
import FAQ from "@/components/FAQ.vue";

interface Category {
  category_id: number
  category_name: string
}

const props = defineProps(["selectedCategory", "cartItem", "push"])
const item = ref()

const emit = defineEmits()
emit("category-selected", props.selectedCategory)
emit("cartItem", props.cartItem)
emit("push", props.push)

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
