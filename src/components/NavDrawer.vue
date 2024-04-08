<template>
  <v-container v-if="categoriesLoaded">
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
  <v-container v-else>
    test
  </v-container>
</template>

<script lang="ts" setup>
import openDatabase from "@/database";
import {onMounted, ref} from "vue";

let categories = ref<any[]>([])
let categoriesLoaded = ref<boolean>(false)

onMounted(async () => {
  const db = await openDatabase()
  db.all('select * from categories', [], (err, rows) => {
    if (err) throw err
    categories.value = rows
    categoriesLoaded.value = true
  })
})
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
