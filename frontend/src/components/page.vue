<template>
    <div class="quran-page">
        <InputNumber class="page-num" placeholder="شماره صفحه" />
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
</style>