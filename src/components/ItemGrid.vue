<template>
  <v-row v-if="!isLoadingItems" class="head-row">
    <v-col v-for="(item, i) in filterItems()" :key="i" class="items-col">
      <v-card height="auto" width="335" class="item-card">
        <v-card-title class="card-title">{{ item.item_name }}</v-card-title>
        <v-card-subtitle class="card-subtitle">{{ item.collection_name }}</v-card-subtitle>
        <v-divider></v-divider>
        <div class="item-img">
          <v-img :width="300" :max-height="300" v-bind:src="'src/assets/items/' + item.item_id + '.jpg'"></v-img>
        </div>
        <v-container class="item-info">
          <div class="text-h5 item-price">{{ item.price + "€" }}</div>
          <div class="item-stock bg-green-accent-1" v-if="item.stock >= 25">In Stock</div>
          <div class="item-stock bg-yellow-accent-1" v-if="item.stock < 25 && item.stock > 0">Few Left</div>
          <div class="item-stock bg-red-accent-1" v-if="item.stock == 0">Out of Stock</div>
        </v-container>
        <v-card-actions>
          <v-btn
            dark
            fixed
            top
            right
            size="large"
            @click="cartItem = (item.item_id, item.item_name)"
          >
            <v-icon icon="mdi-plus"/>
            Add to Cart
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-row v-else class="head-row"></v-row>
</template>

<script lang="ts" setup>
import {defineEmits, onMounted, ref, watch} from "vue"

interface Item {
  item_id: string
  item_name: string
  category_name: string
  collection_name: string
  price: number
  stock: number
}

const props = defineProps(["selectedCategory", "cart"])
const items = ref<Item[]>([])
const filteredItems = ref<Item[]>([])
const isLoadingItems = ref<boolean>(false)
const cartItem = ref()

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

const emit = defineEmits()
if (cartItem) {
  emit("cartItem", cartItem.value)
  emit("push", true)
  cartItem.value = null
}

onMounted(fetchItems)
watch(() => props.selectedCategory, filterItems, {deep: true})
</script>

<style scoped>
.category-headline {
  width: 100%;
}

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

.card-title {
  padding-bottom: 0;
}

.card-subtitle {
  margin-top: 0;
  margin-bottom: 10px;
}

.item-img {
  padding: 0;
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.item-info {
  display: flex;
  align-items: center;
}

.item-price {
  width: 60%;
  margin: 0;
}

.item-stock {
  padding: 10px;
  width: 40%;
  text-align: center;
  border-radius: 10px;
}
</style>
