<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import InputText from "primevue/inputtext"
import Button from 'primevue/button'
import Queryform from './components/Queryform.vue'
</script>

<template>
  <div class="appface">
    <div class="apppanel ld ld-float-btt-in">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.appface {
  width: 100%;
  height: 100%;
  background: url("./assets/bg.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  gap: 15px;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
}
.apppanel {
  width: 90%;
  height: 90%;
  backdrop-filter: blur(10px);
  border-radius: 50px;
  background: #0003;
  box-shadow: 0 0 20px 13px #ffffff55;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}
.app-banner {
  filter: drop-shadow(0px 0px 10px rgb(255, 255, 255));
}
</style>
