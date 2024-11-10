<template>
    <div class="container flex flex-column">
        <div @submit.prevent="submitForm" class="form flex flex-column">
            <h2>Sign In</h2>
            <form class="flex flex-column">
                <input required id="email" v-model="email" type="email" placeholder="Email">
                <input required id="password" v-model="password" type="password" placeholder="Password">
                <button class="purple" type="submit">Login</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { AuthApis } from '~/server/authApis';

const email = ref('');
const password = ref('');
const role = ref('subscriber');

const submitForm = async () => {
    try {
        const _authApis = new AuthApis();
        const paylaod = {
            email: email.value,
            password: password.value,
            role: role.value
        }        
        const response = await _authApis.login(paylaod);
        
        if (response.status !== 200) {
            console.log(response);
            alert("Login failed. Please try again.");
        }

        if (response.status === 200) {
            const accessToken = response.data.payload.accessToken;
            const refreshToken = response.data.payload.refreshToken;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            navigateTo('/');
        }
    } catch (error) {
        console.log(error);
        alert("Login failed. Please try again.");
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
</style>