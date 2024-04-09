<template>
  <div v-if="selectedCategory == null || selectedCategory == 'HOME'">
    <v-container class="text-h5 category-headline">HOME</v-container>
  </div>
  <v-container v-else>
    <ItemGrid :selectedCategory="selectedCategory" class="item-grid"/>
  </v-container>
</template>

<script setup lang="ts">
import ItemGrid from "@/components/ItemGrid.vue";
import {defineEmits} from "vue";

const props = defineProps(['selectedCategory']);
// eslint-disable-next-line vue/valid-define-emits
const emit = defineEmits();
const selectCategory = (category: any) => {
  emit('category-selected', props.selectedCategory)
}
</script>

<style scoped>
.category-headline {
  width: 100%;
}

.item-grid {
  width: 100%;
  margin: 0;
  padding: 10px;
}
</style>
