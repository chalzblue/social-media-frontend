<template>
    <div class="container flex flex-column">
        <h1>Dashboard</h1>
        <div class="">
            {{ data }}
        </div>
    </div>
</template>

<script setup>
import { DataApis } from '~/server/dataApis';

useHead({
    title: 'Dashboard',
})

let data = ref([]);

const _dataApis = new DataApis();
const fetchDatas = async () => {
    try {
        const response = await _dataApis.fetchPages();
        if(response.status !== 200) {
            console.error("Error while fetching pages", response.data);
            return [];
        } else {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

onMounted(async () => {
    data.value = await fetchDatas();
})

</script>

<style lang="scss" scoped>
.container {
    min-height: 100vh;
    justify-content: center;
    align-items: center;
}
</style>