<template>
  <v-container>
    <v-container justify="center" align="center">
      <v-img
        :width="150"
        aspect-ratio="16/9"
        cover
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
      ></v-img>
    </v-container>
    <v-divider></v-divider>
    <v-container justify="center" class="nav-container-content">
      <v-list-item title="HOME"></v-list-item>
      <v-list-item title="ITEMS"></v-list-item>
      <v-list-item title="CATEGORIES">
        <v-list-item
          class="category-items"
          v-for="category in categories"
          :key="category.category_id"
          :title="category.name"
        ></v-list-item>
      </v-list-item>
      <v-list-item title="ABOUT"></v-list-item>
      <v-list-item title="FAQ"></v-list-item>
    </v-container>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

interface Category {
  category_id: number;
  name: string;
}

const categories = ref<Category[]>([]);

const fetchUsers = async () => {
  try {
    const response = await fetch('http://localhost:1337/categories');
    const data = await response.json();
    categories.value = data.data;
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error);
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
.nav-container-content {
  padding-left: 50px;
  padding-right: 50px;
}

.category-items {
  font-size: smaller
}
</style>
