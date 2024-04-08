<template>
  <v-container class="site-container" justify="center">
    <NavDrawer class="nav-drawer" />
    <Display class="display"/>
  </v-container>
</template>

<script lang="ts" setup>
  import NavDrawer from "@/components/NavDrawer.vue";
  import Display from "@/views/Display.vue";
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
  background-color: blanchedalmond;
  padding: 0;
}

.nav-drawer {
  width: 30%;
  background-color: cadetblue;
}

.display {
  width: 70%;
  padding: 0;
  background-color: darkkhaki;
}
</style>
