<template>
  <v-container class="site-container" justify="center">
    <NavDrawer @category-selected="onCategorySelected" class="nav-drawer"/>
    <Display :selectedCategory="selectedCategory" class="display"/>
  </v-container>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import NavDrawer from "@/components/NavDrawer.vue";
import Display from "@/views/Display.vue";

const selectedCategory = ref(null);

const onCategorySelected = (category: any) => {
  selectedCategory.value = category;
}
</script>

<style scoped>
.site-container {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}

.nav-drawer {
  width: 30%;
}

.display {
  width: 70%;
  padding: 0;
}
</style>
