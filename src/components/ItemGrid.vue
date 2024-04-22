<template>
  <v-row v-if="!isLoadingItems" class="head-row">
    <v-col v-for="(item, i) in filterItems()" :key="i" class="items-col">
      <ItemCard :item="item" />
    </v-col>
  </v-row>
  <v-row v-else class="head-row"></v-row>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from "vue"
import ItemCard from "@/components/ItemCard.vue";

interface Item {
  item_id: string
  item_name: string
  category_name: string
  collection_name: string
  price: number
  stock: number
}

const props = defineProps(["selectedCategory"])
const items = ref<Item[]>([])
const isLoadingItems = ref<boolean>(false)

const fetchItems = async () => {
  try {
    isLoadingItems.value = true
    const response = await fetch("http://localhost:1337/items")
    const data = await response.json()
    items.value = data.data
    isLoadingItems.value = false
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error)
  }
}

const filterItems = () => {
  if (props.selectedCategory && props.selectedCategory.category_name) {
    return items.value.filter(
      (item) => item.category_name === props.selectedCategory.category_name
    )
  }
  if (props.selectedCategory === "ITEMS") {
    return items.value
  }
}

onMounted(fetchItems)
watch(() => props.selectedCategory, filterItems, {deep: true})
</script>

<style scoped>
.head-row {
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
