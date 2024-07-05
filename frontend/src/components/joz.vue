<template>
    <div class="quran-joz">
        <Select v-model="joz" :options="jozlist.list" optionLabel="joz" placeholder="جزء مورد نظر" class="w-full joz-list md:w-56" />
        <Button @click="getjoz()">نمایش</Button>
    </div>
</template>

<script setup lang="ts">
import Select from 'primevue/select'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import {Types} from '../abstraction'
import { onBeforeMount } from 'vue'
import { useAttrs } from 'vue'
import { useRouter } from 'vue-router'

var attr = useAttrs()
var joz = ref()
var jozlist = ref({list:['x']})

onBeforeMount(()=>{
    fetch("http://localhost:3000/api/jozlist",{method:"GET"}).then(x=>x.json()).then((x:any)=>{
        console.log(x)
        jozlist.value.list = x
    })
})

var r = useRouter()

function getjoz() {
    r.push("/explore/joz?j="+joz.value.id+"&m="+attr.mean)
}
</script>

<style scoped>
.quran-joz {
    gap: 10px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: flex-start;
}

.joz-list {
    color: #000;
}
</style>../abstraction