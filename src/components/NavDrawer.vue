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
        <v-list-item class="category-items"
                     v-for="n in number"
                     :key="n"
                     :title="'Item ' + n"
        ></v-list-item>
      </v-list-item>
      <v-list-item title="ABOUT"></v-list-item>
      <v-list-item title="FAQ"></v-list-item>
    </v-container>
  </v-container>
</template>

<script lang="ts" setup>
let number = 10
</script>

<style scoped>
.nav-container-content {
  padding-left: 50px;
  padding-right: 50px;
}

.category-items {
  font-size: smaller;
}
</style>
