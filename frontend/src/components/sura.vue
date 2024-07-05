<template>
    <div class="quran-joz">
        <Select v-model="sura" :options="suralist.list" optionLabel="sura" placeholder="فهرست سوره ها"
            class="w-full joz-list md:w-56" />
        <InputNumber v-model="aya" class="aya-num" placeholder="شماره آیه" />
        <Button @click="getsura()">نمایش</Button>
    </div>
</template>

<script setup lang="ts">
import Select from 'primevue/select'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber';
import { onMounted, ref } from 'vue'
import { Types } from '../abstraction'
import { onBeforeMount } from 'vue'
import { useAttrs } from 'vue';
import { useRouter } from 'vue-router';

var attr = useAttrs()
var sura = ref()
var aya = ref(0)
var suralist = ref({ list: ['x'] })
var r = useRouter()

onBeforeMount(() => {
    fetch("http://localhost:3000/api/suralist", { method: "GET" }).then(x => x.json()).then((x: any) => {
        console.log(x)
        suralist.value.list = x
    })
})

function getsura() {
    r.push('/explore/sura?s='+sura.value.id+"&a="+aya.value+"&m="+attr.mean)
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

.aya-num .p-inputtext {
    width: 30px !important;
}

.joz-list {
    color: #000;
}
</style>../abstraction