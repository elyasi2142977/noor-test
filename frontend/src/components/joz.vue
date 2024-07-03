<template>
    <div class="quran-joz">
        <Select v-model="joz" :options="jozlist.list" optionLabel="joz" placeholder="جزء مورد نظر" class="w-full joz-list md:w-56" />
        <Button>نمایش</Button>
    </div>
</template>

<script setup lang="ts">
import Select from 'primevue/select'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import {Types} from '../abstruction'
import { onBeforeMount } from 'vue'

var joz = ref()
var jozlist = ref({list:['x']})

onBeforeMount(()=>{
    fetch("http://localhost:3000/api/jozlist",{method:"GET"}).then(x=>x.json()).then((x:any)=>{
        console.log(x)
        jozlist.value.list = x
    })
})

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
</style>