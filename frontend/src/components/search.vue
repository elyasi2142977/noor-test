<template>
    <div class="quran-search">
        <div class="quran-search">
            <InputText id="keyword" v-model="keyword.word" placeholder="کلمه مورد نظر را وارد کنید" />
            <Button @click="search()">جستجو</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputText from "primevue/inputtext"
import Button from 'primevue/button'
import { useRouter } from 'vue-router';
import { inject } from 'vue';
import { useAttrs } from 'vue';
var keyword = ref({word:""})

var attr = useAttrs()
var r = useRouter()

function search() {
    r.push("/explore/search?s="+keyword.value.word+"&m="+attr.mean)
}

</script>

<style scoped>
#keyword {
    color: black;
}
.quran-search {
    display: flex;
    gap: 10px;
}
</style>