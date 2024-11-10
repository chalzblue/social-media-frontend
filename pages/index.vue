<template>
    <div class="root-container">
        <div class="top-row flex">
            <h1>Home</h1>
            <button class="red" @click="logout">
                <div v-if="!loading">Logout</div>
                <div v-else class="spinner"></div>
            </button>
        </div>
        <div class="container flex flex-column">
            <div v-if="!isConnected" class="facebook-container flex flex-column">
                <p>Connect with Facebook</p>
                <button @click="connectToFacebook" class="green flex">
                    <div v-if="!loading">Connect</div>
                    <div v-else class="spinner"></div>
                </button>
            </div>
            <div v-else class="connected-container flex flex-column">
                <p>You are connected.</p>
                <p>choose the facebook pages you want to integrate</p>
                <div class="page-container flex flex-column">
                    <ul class="" v-for="page in pages" :key="page.id">
                        <li @click="selectPages(page.id)" class="pages">{{ page.name }}</li>
                    </ul>
                </div>
                <button class="purple flex" @click="submitPages">
                    <div v-if="!loading">Submit</div>
                    <div v-else class="spinner"></div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { MetaApis } from '~/server/metaApis';
const _metaApis = new MetaApis();

const isConnected = ref(true);
const pages = ref([]);
const selectedPages = ref([]);
const loading = ref(false);

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
        loading.value = true;
        const resposnse = await _metaApis.intializeFacebookOauth();
        console.log(resposnse);
        setTimeout(async () => {
            if(resposnse.status === 200) {
                isConnected.value = true;
                pages.value = await fetchPagesOfUser();
            } else {
                isConnected.value = false;
                console.error("Error while connecting to facebook", resposnse.data);
                alert("Error while connecting to facebook");
            }
        }, 1000);
    } catch (error) {
        console.error("Error while connecting to facebook", error);
    } finally {
        loading.value = false;
    }
}

const fetchPagesOfUser = async () => {
    try {
        const response = await _metaApis.fetchPages();
        if(response.status !== 200) {
            console.error("Error while fetching pages", response.data);
            return [];
        }
        return response.data;;
    } catch (error) {
        console.error("Error while fetching pages", error);   
    }
}

const selectPages = async (pageId) => {
    try {
        selectedPages.value.push(pageId);
        console.log(selectedPages.value);
    } catch (error) {
        console.error("Error while selecting pages", error);
    }
}

const submitPages = async () => {
    try {
        loading.value = true;
        const response = await _metaApis.selectPages(selectedPages.value);
        setTimeout(() => {
            if(response.status === 200) {
                console.log("Pages integrated successfully");
                alert("Pages integrated successfully");
            } else {
                console.log("Error while submitting selected pages", response.data);
                alert("Error while submitting selected pages");
            }
        }, 1000)
    } catch (error) {
        console.error("Error while submit selected pages", error);
    } finally {
        loading.value = false;
    }
}

const logout = async () => {
    try {
        loading.value = true;
        setTimeout(() => {
            useCookie('accessToken').value = null;
            useCookie('refreshToken').value = null;
            navigateTo('/login');
        }, 1000)
    } catch (error) {
        console.error("Error while logging out", error);
    }
}
</script>

<style lang="scss" scoped>
.root-container {
    min-height: 100vh;
}

.top-row {
    justify-content: space-between;
    align-items: center;
    padding: 15px 40px;
}

.red {
    background-color: transparent;
    color: red;
    border: red 1px solid;
    padding: 8px 20px;
}

.container {
    justify-content: center;
    align-items: center;
    margin-top: 50px;
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

.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #fff;
    width: 1.5rem;
    height: 1.5rem;
    animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>