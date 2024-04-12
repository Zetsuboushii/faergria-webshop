<template>
  <v-parallax height="60%" src="../assets/header.png"></v-parallax>
  <v-container class="content-container" justify="center">
    <NavDrawer @category-selected="onCategorySelected" class="nav-drawer"/>
    <Display :selectedCategory="selectedCategory" class="display"/>
  </v-container>
  <v-btn
    v-scroll="onScroll"
    v-show="fab"
    fab
    dark
    fixed
    bottom
    right
    color="primary"
    @click="toTop"
    class="fab-button"
  >
    <v-icon icon="mdi-arrow-up" />
  </v-btn>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import NavDrawer from "@/components/NavDrawer.vue"
import Display from "@/views/Display.vue"

interface EventTargetWithScrollTop extends EventTarget {
  scrollTop?: number
}

const selectedCategory = ref(null)
const fab = ref<boolean>(false)

const onCategorySelected = (category: any) => {
  selectedCategory.value = category
}

const onScroll = (e: Event) => {
  if (typeof window === "undefined") return
  const target = e.target as EventTarget & { scrollTop?: number }
  const top = window.pageYOffset || target.scrollTop || 0
  fab.value = top > 20
}

const toTop = () => {
  // const app = getCurrentInstance()?.appContext.app
  // const vuetify = app?.config.globalProperties.$vuetify
  window.scrollTo({ top: 0, behavior: "smooth" })
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
}

.display {
  width: 70%;
  padding: 0;
}

.fab-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
}
</style>
