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
                    <Search />
                </TabPanel>
                <TabPanel value="1">
                    <Joz />
                </TabPanel>
                <TabPanel value="2">
                    <Sura />
                </TabPanel>
                <TabPanel value="3">
                    <Page />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>

<script setup lang="ts">
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Search from './search.vue'
import Joz from './joz.vue'
import Sura from './sura.vue'
import Page from './page.vue'
</script>

<style scoped>
.queryform {
    width: 50%;
    border-radius: 50px;
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