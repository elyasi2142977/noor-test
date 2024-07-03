<script setup lang="ts">
import Queryform from '../components/Queryform.vue'
</script>

<template>
  <div class="main-page">
    <img class="app-banner" src="../assets/banner.png" alt="" srcset="" width="300" height="300">
    <Queryform />
  </div>
</template>

<style scoped>
.app-banner {
  filter: drop-shadow(0px 0px 10px rgb(255, 255, 255));
}
.main-page {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
}
</style>