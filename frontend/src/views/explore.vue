<template>
  <div class="explore">
    <div class="quran-text-view">
      <Ayat v-for="item in response.list" :sura="item.sura" :aya="item.aya" :text="item.text" :mean="item.mean" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Ayat from '../components/ayat.vue'
import {Types} from '../abstraction'

var response = ref<{list:Types.IAye[]}>({list:[]})

var r = useRoute()
onBeforeMount(()=>{
  switch (r.params.api) {
    case "search":{
      fetch("http://localhost:3000/api/search?s=" + r.query.s + "&m=" + r.query.m).then(x=>x.json()).then((x)=>{
        console.log(x)
        response.value.list = x
      }).catch((err)=>{
        alert(err.text)
        return 0
      })
      break
    }
    case "joz":{
      fetch("http://localhost:3000/api/joz/" + r.query.j + "?m=" + r.query.m).then(x => x.json()).then((x) => {
        console.log(x)
        response.value.list = x
      }).catch((err) => {
        alert(err.text)
        return 0
      })
      break
    }
    case "sura": {
      fetch("http://localhost:3000/api/sura?s=" + r.query.s + "&a=" + r.query.a + "&m=" + r.query.m).then(x => x.json()).then((x) => {
        console.log(x)
        response.value.list = x
      }).catch((err) => {
        alert(err.text)
        return 0
      })
      break
    }
    case "page": {
      fetch("http://localhost:3000/api/page/" + r.query.p + "?m=" + r.query.m).then(x => x.json()).then((x) => {
        console.log(x)
        response.value.list = x
      }).catch((err) => {
        alert(err.text)
        return 0
      })
    }
  }
})

</script>

<style>
.explore {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  flex-direction: row;
  flex-wrap: nowrap;
}
.quran-text-view {
  height: 100%;
  width: 600px;
  background: #fff;
  border-image-source: url('../assets/quran-border.png');
  border-image-width: 30px;
  border-image-repeat: round;
  border-image-slice: 25;
  border-image-outset: 25px;
  filter: drop-shadow(0px 0px 10px green);
  padding: 30px;
  overflow: auto;
}
</style>
../abstraction