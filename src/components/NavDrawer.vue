<template>
  <v-container>
    <v-container align="center">
      <v-img :width="200" src="../assets/logo.png"></v-img>
    </v-container>
    <v-divider></v-divider>
    <v-container justify="center" class="nav-container-content">
      <v-list-item title="HOME" @click="selectCategory('HOME')"></v-list-item>
      <v-list-item title="ITEMS" @click="selectCategory('ITEMS')"></v-list-item>
      <v-list-item title="CATEGORIES">
        <v-list-item
          class="category-items"
          v-for="category in categories"
          :key="category.category_id"
          :title="category.category_name"
          @click="selectCategory(category)"
        ></v-list-item>
      </v-list-item>
      <v-list-item title="ABOUT" @click="selectCategory('ABOUT')"></v-list-item>
      <v-list-item title="FAQ" @click="selectCategory('FAQ')"></v-list-item>
    </v-container>
  </v-container>
</template>

<script lang="ts" setup>
import {defineEmits, onMounted, ref} from "vue"

interface Category {
  category_id: number
  category_name: string
}

interface Collection {
  collection_id: number
  collection_name: string
}

const categories = ref<Category[]>([])
const collections = ref<Collection[]>([])

const fetchCategories = async () => {
  try {
    const response = await fetch('http://localhost:1337/categories')
    const data = await response.json()
    categories.value = data.data
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error)
  }
}

const fetchCollections = async () => {
  try {
    const response = await fetch('http://localhost:1337/collections')
    const data = await response.json()
    collections.value = data.data
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error)
  }
}

const emit = defineEmits()
const selectCategory = (category: any) => {
  emit('category-selected', category)
}

onMounted(() => {
  fetchCategories();
  fetchCollections();
});
</script>

<style scoped>
.nav-container-content {
  padding-left: 20px;
  padding-right: 20px;
}

.category-items {
  font-size: smaller
}
</style>
