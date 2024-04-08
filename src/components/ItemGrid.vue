<template>
  <v-container>
    <v-row class="items-row">
      <v-col v-for="(item, i) in items" :key="i" class="items-col">
        <v-card height="450" width="335" class="item-card">
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-text>{{ item.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

let items = ref([
  {title: 'エレメント 1', description: 'エレメント 1 デスクリプション'},
  {title: 'エレメント 2', description: 'エレメント 2 デスクリプション'},
  {title: 'エレメント 3', description: 'エレメント 3 デスクリプション'},
  {title: 'エレメント 4', description: 'エレメント 4 デスクリプション'},
  {title: 'エレメント 5', description: 'エレメント 5 デスクリプション'}
]);
</script>

<style scoped>
.items-row {
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
