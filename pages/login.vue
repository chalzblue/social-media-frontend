<template>
    <div class="container flex flex-column">
        <div @submit.prevent="submitForm" class="form flex flex-column">
            <h2>Sign In</h2>
            <form class="flex flex-column">
                <input required id="email" v-model="email" type="email" placeholder="Email">
                <input required id="password" v-model="password" type="password" placeholder="Password">
                <button class="purple flex" type="submit">
                    <div v-if="!loading">Login</div>
                    <div v-else class="spinner"></div>
                </button>
                <p>Don't have an account? <nuxt-link class="link" to="/register">Sign Up</nuxt-link></p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { AuthApis } from '~/server/authApis';

const email = ref('');
const password = ref('');
const role = ref('subscriber');
const loading = ref(false);

const submitForm = async () => {
    try {
        loading.value = true;
        const _authApis = new AuthApis();
        const paylaod = {
            email: email.value,
            password: password.value,
            role: role.value
        }        
        const response = await _authApis.login(paylaod);
        
        setTimeout(() => {
            if (response.status !== 200) {
                console.log(response);
                alert(response.data.message);
            }

            if(response.status === 400) {
                console.log(response);
                alert(response.data.message);
            }

            if (response.status === 200) {
                const accessToken = response.data.payload.accessToken;
                const refreshToken = response.data.payload.refreshToken;

                useCookie('accessToken').value = accessToken;
                useCookie('refreshToken').value = refreshToken;

                navigateTo('/');
            }
        },1000)
    } catch (error) {
        console.log(error);
        alert("Login failed. Please try again.");
    } finally {
        loading.value = false;
    }
}
</script>

<style lang="scss" scoped>
.container {
    min-height: 100vh;
    justify-content: center;
    align-items: center;
}
.form {
    max-width: 400px;
    width: 100%;
    min-height: 350px;
    justify-content: center;
    margin: 0 auto;
    padding: 40px 60px;
    background-color: #f5f5f5;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form,
.form {
    gap: 20px;
}

input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 12px;
}

button {
    justify-content: center;
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

p {
    font-size: 12px;
    .link {
        text-decoration: none;
    }
}
</style>