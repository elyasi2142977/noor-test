<template>
    <div class="quran-joz">
        <Select v-model="sura" :options="suralist.list" optionLabel="sura" placeholder="فهرست سوره ها"
            class="w-full joz-list md:w-56" />
        <InputNumber class="aya-num" placeholder="شماره آیه" />
        <Button>نمایش</Button>
    </div>
</template>

<script setup lang="ts">
import Select from 'primevue/select'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber';
import { onMounted, ref } from 'vue'
import { Types } from '../abstruction'
import { onBeforeMount } from 'vue'

var sura = ref()
var suralist = ref({ list: ['x'] })

onBeforeMount(() => {
    fetch("http://localhost:3000/api/suralist", { method: "GET" }).then(x => x.json()).then((x: any) => {
        console.log(x)
        suralist.value.list = x
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

.aya-num .p-inputtext {
    width: 30px !important;
}

.joz-list {
    color: #000;
}
</style>