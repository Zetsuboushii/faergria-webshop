<template>
  <v-parallax height="60%" src="../assets/header.png"></v-parallax>
  <v-container class="content-container" justify="center">
    <NavDrawer @category-selected="onCategorySelected" class="nav-drawer"/>
    <Display :selectedCategory="selectedCategory" class="display"/>
  </v-container>
  <SideDrawer/>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import NavDrawer from "@/components/NavDrawer.vue"
import Display from "@/views/Display.vue"
import SideDrawer from "@/components/SideDrawer.vue"

interface EventTargetWithScrollTop extends EventTarget {
  scrollTop?: number
}

interface CartItem {
  item_id: string
  item_name: string
}

const selectedCategory = ref(null)

const onCategorySelected = (category: any) => {
  selectedCategory.value = category
}
</script>

<style scoped>
.content-container {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  max-height: 1000px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}

.nav-drawer {
  width: 30%;
  height: 800px;
}

.display {
  width: 70%;
  padding: 0;
  height: 800px;
  overflow-y: scroll;
}
</style>
