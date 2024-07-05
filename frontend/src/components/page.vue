<template>
    <div class="quran-page">
        <InputNumber v-model="page" class="page-num" placeholder="شماره صفحه" />
        <Button @click="getpage()">نمایش</Button>
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

var page = ref(1)
var attr = useAttrs()
var r = useRouter()

function getpage() {
    r.push('/explore/page?p='+page.value+"&m="+attr.mean)
}

</script>

<style scoped>
.quran-page {
    gap: 10px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: flex-start;
}

.page-num .p-inputtext {
    width: 30px !important;
}
</style>../abstraction