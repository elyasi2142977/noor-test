<template>
    <div class="quran-aya">
        <p class="aya-info">سوره {{ a.sura }} - آیه {{ a.aya }}: </p>
        <p class="aya-text">{{ a.text }}</p>
        <p class="aya-mean">{{ a.mean }}</p>
    </div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';

var a = useAttrs()

</script>

<style>
.quran-aya {
    /* border-top: 1px #00000080 dotted; */
    border-bottom: 1px #00000080 dotted;
}
.aya-info {
    font-family: 'IranSans';
    font-size: 0.7em;
    width: 100%;
}
.aya-text {
    font-family: 'QuranTaha';
    width: 100%;
}
.aya-mean {
    font-family: 'IranSans';
    font-size: 0.7em;
    color: green;
}
</style>
