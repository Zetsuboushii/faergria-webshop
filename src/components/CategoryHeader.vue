<template>
  <v-container class="text-h4 category-headline">{{ selectedCategory }}</v-container>
  <v-divider></v-divider>
</template>

<script setup lang="ts">
const props = defineProps(['selectedCategory'])
</script>

<style scoped>

</style>
