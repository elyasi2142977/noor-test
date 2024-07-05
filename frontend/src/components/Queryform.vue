<template>
    <div class="queryform">
        <Tabs value="0">
            <TabList class="tab-list no-bg">
                <Tab value="0">جستجو</Tab>
                <Tab value="1">جزء</Tab>
                <Tab value="2">سوره / آیه</Tab>
                <Tab value="3">صفحه</Tab>
            </TabList>
            <TabPanels class="tab-panels no-bg">
                <TabPanel value="0">
                    <Search :mean="meaningful.table" />
                </TabPanel>
                <TabPanel value="1">
                    <Joz :mean="meaningful.table" />
                </TabPanel>
                <TabPanel value="2">
                    <Sura :mean="meaningful.table" />
                </TabPanel>
                <TabPanel value="3">
                    <Page :mean="meaningful.table" />
                </TabPanel>
            </TabPanels>
        </Tabs>
        <Select @change="changetrans()" v-model="meaningful" :options="translist.list" optionLabel="name" placeholder="ترجمه" class="w-full joz-list md:w-56" />
    </div>
</template>

<script setup lang="ts">
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Select from 'primevue/select'
import Search from './search.vue'
import Joz from './joz.vue'
import Sura from './sura.vue'
import Page from './page.vue'
import { ref } from 'vue'
import { onBeforeMount } from 'vue'
import { provide } from 'vue'
import {Types} from '../abstraction'

var meaningful = ref<Types.ITrans>({id:"2",name:"انصاریان",table:"fa_ansarian",selection:"0"})
var translist = ref({list:['x']})

function changetrans() {
    console.log(meaningful.value.table)
    //meaningful.value = 
}

onBeforeMount(()=>{
    fetch("http://localhost:3000/api/translist",{method:"GET"}).then(x=>x.json()).then((x)=>{
        console.log(x)
        translist.value.list = x
        console.log(translist.value.list)
    })
})

</script>

<style scoped>
.queryform {
    width: 50%;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;

}
.tab-list * {
    color: #fff;
    font-family: 'IranSans';
}

* {
    font-family: 'IranSans';
}

.tab-list * {
    background: none;
}
.no-bg {
    background: none;
}
.tab-panels {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: flex-start;
}
.tab-list * {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
}
</style>