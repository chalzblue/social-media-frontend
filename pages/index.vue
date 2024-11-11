<template>
    <div class="root-container">
        <div class="top-row flex">
            <h1>Home</h1>
            <button class="red" @click="logout">
                <div v-if="!logoutLoading">Logout</div>
                <div v-else class="spinner"></div>
            </button>
        </div>
        <div class="container flex flex-column">
            <div v-if="!isConnected" class="facebook-container flex flex-column">
                <h3>Authenticate with Facebook.</h3>
                <button @click="connectToFacebook" class="green flex">
                    <div v-if="!loading">Connect</div>
                    <div v-else class="spinner"></div>
                </button>
            </div>
            <div v-else class="connected-container flex flex-column">
                <p class="connected-msg">You are connected.</p>
                <p>choose the facebook pages you want to integrate.</p>
                <div class="page-container flex flex-column">
                    <ul class="pages" v-for="page in pages" :key="page.id" :class="{ 'selected': selectedPages.some(selectedPage => selectedPage.id === page.id) }">
                        <li @click="toggleSelection(page)" class="individual-page">{{ page.name }}</li>
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

const isConnected = ref(false);
const pages = ref([]);
const selectedPages = ref([]);
const loading = ref(false);
const logoutLoading = ref(false);
pages.value = [];

const checkIfConnectedWithFacebook = async () => {
    const response = await _metaApis.checkIfConnectedWithFacebook();
    if(response.status === 200 && response.data) {
        useCookie('facebook_connected').value = true;
        isConnected.value = true;
        const fetchedPages= await fetchPagesOfUser();
        if(fetchedPages && fetchedPages.payload.length > 0) {
            for (const page of fetchedPages.payload) {
                const pageData = {
                    id: page.id,
                    name: page.name,
                    access_token: page.access_token
                };
                pages.value.push(pageData);
            }
        }
    } else {
        useCookie('facebook_connected').value = false;
        isConnected.value = false;
    }
}

onMounted(async () => {
    checkIfConnectedWithFacebook();
})

const connectToFacebook = async () => {
    try {
        loading.value = true;
        await _metaApis.intializeFacebookOauth();
    } catch (error) {
        console.error("Error while connecting to facebook", error);
    } finally {
        loading.value = false;
    }
}

const route = useRoute();
if(route.query.facebook_connected) {
    onMounted(async () => {
        const facebookConnected = route.query.facebook_connected;
        if (facebookConnected === 'true') {
          isConnected.value = true;
          console.log('Facebook connected');
          const fetchedPages= await fetchPagesOfUser();
          pages.value.push(fetchedPages);
        } else {
          isConnected.value = false;
          console.log('Facebook not connected');
        }
    })
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

const toggleSelection = async (page) => {
    try {
        // Check if selectedPages already contains an object with the same page id
        const pageIndex = selectedPages.value.findIndex(selectedPage => selectedPage.id === page.id);

        if (pageIndex !== -1) {
            // Remove page from selectedPages if it exists
            selectedPages.value.splice(pageIndex, 1);
        } else {
            const pageData = {
                id: page.id,
                access_token: page.access_token
            };
            selectedPages.value.push(pageData);
        }
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
        logoutLoading.value = true;
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
    margin-top: 40px;
}

.facebook-container {
    gap: 20px;
    margin-top: 120px;

    button {
        justify-content: center;
        align-items: center;
    }
}

.connected-container {
    gap: 16px;
    margin-top: 25px;
    align-items: center;
}

.connected-msg {
    font-size: 20px;
    color: green;
    font-weight: 600;
}

.page-container {
    margin: 8px;
    gap: 6px;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    scroll-behavior: smooth;
    padding: 0 20px;
}

.pages {
    border: 1px solid #ccc;
    padding: 10px 30px;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
}

.pages:hover {
    background-color: #ebebeb;
}

.pages:active {
    background-color: #ccc;
}

.selected {
  background-color: #e0f7fa; /* Highlight color for selected items */
  border-color: #068578;
  color: #068578;
}

.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #fff;
    width: 1.2rem;
    height: 1.2rem;
    animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>