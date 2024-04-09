<template>
  <v-container>
    <v-row class="items-row">
      <v-col v-for="(item, i) in items" :key="i" class="items-col">
        <v-card height="450" width="335" class="item-card">
          <v-card-title>{{ item.item_name }}</v-card-title>
          <v-card-text>{{ item.category_name }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

interface Item {
  item_id: number;
  item_name: string;
  category_name: string;
}

const props = defineProps(['selectedCategory']);
const items = ref<Item[]>([]);

const fetchItems = async () => {
  try {
    const response = await fetch('http://localhost:1337/items');
    const data = await response.json();
    items.value = data.data;
    items.value = items.value.filter(item => item == props.selectedCategory)
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error);
  }
};

onMounted(fetchItems);
</script>

<style scoped>
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
