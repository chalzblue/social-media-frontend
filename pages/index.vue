<template>
    <div class="container flex flex-column">
        <h1>Home</h1>
        <div v-if="!isConnected" class="facebook-container flex flex-column">
            <p>Connect with Facebook</p>
            <button @click="connectToFacebook" class="green">Connect</button>
        </div>
        <div v-else class="connected-container flex flex-column">
            <p>You are connected.</p>
            <p>choose the facebook pages you want to integrate</p>
            <div class="page-container flex flex-column">
                <ul class="" v-for="page in pages" :key="page.id">
                    <li @click="selectPages(page.id)" class="pages">{{ page.name }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { MetaApis } from '~/server/metaApis';

const isConnected = ref(false);
const pages = ref([]);
const selectedPages = ref([]);

pages.value = [
    {
        id: 1,
        name: "Page 1"
    },
    {
        id: 2,
        name: "Page 2"
    },
    {
        id: 3,
        name: "Page 3"
    },
    {
        id: 4,
        name: "Page 4"
    },
    {
        id: 5,
        name: "Page 5"
    }
]

const connectToFacebook = async () => {
    try {
        const _metaApis = new MetaApis();
        const resposnse = await _metaApis.intializeFacebookOauth();
        console.log(resposnse);
        
    } catch (error) {
        console.error("Error while connecting to facebook", error);
    }
}

const selectPages = (pageId) => {
    try {
        isConnected.value = false;
        selectedPages.value.push(pageId);
        // const response = ;
    } catch (error) {
        console.error("Error while selecting pages", error);
    }
}

</script>

<style lang="scss" scoped>
.container {
    justify-content: center;
    min-height: 100vh;
    align-items: center;
}

.facebook-container {
    gap: 20px;
    margin-top: 25px;
}

.connected-container {
    gap: 16px;
    margin-top: 25px;
    align-items: center;
}

.page-container {
    margin-top: 8px;
    gap: 6px;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    scroll-behavior: smooth;
}

.pages {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
}
</style>