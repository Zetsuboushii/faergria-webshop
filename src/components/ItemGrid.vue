<template>
    <v-row v-if="filteredItems.length > 0" class="items-row">
      <v-container class="text-h5 category-headline">CATEGORY/{{ filteredItems[0].category_name }}</v-container>
      <v-col v-for="(item, i) in filteredItems" :key="i" class="items-col">
        <v-card height="450" width="335" class="item-card">
          <v-card-title>{{ item.item_name }}</v-card-title>
          <v-card-text>{{ item.category_name + '\n' + item.collection_name }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else class="items-row">
      <!--TODO Bug: ITEMS HL wird immer bei erster Anwahl angezeigt-->
      <v-container class="text-h5 category-headline">ITEMS</v-container>
      <v-col v-for="(item, i) in items" :key="i" class="items-col">
        <v-card height="450" width="335" class="item-card">
          <v-card-title>{{ item.item_name }}</v-card-title>
          <v-card-text>{{ item.category_name + '\n' + item.collection_name }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";

interface Item {
  item_id: number;
  item_name: string;
  collection_name: string
  category_name: string;
}

const props = defineProps(["selectedCategory"]);
const items = ref<Item[]>([]);
const filteredItems = ref<Item[]>([]);

const fetchItems = async () => {
  try {
    const response = await fetch("http://localhost:1337/items");
    const data = await response.json();
    items.value = data.data;
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error);
  }
};

const filterItems = async () => {
  if (props.selectedCategory && props.selectedCategory.category_name) {
    filteredItems.value = items.value.filter(
      (item) => item.category_name === props.selectedCategory.category_name
    );
  } else {
    filteredItems.value = [];
  }
};

onMounted(fetchItems);
watch(() => props.selectedCategory, filterItems, {deep: true});
</script>

<style scoped>
.category-headline {
  width: 100%;
}

.items-row {
  margin: 0;
  padding: 0;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
}

.items-col {
  margin: 0;
  padding: 0;
}
</style>
