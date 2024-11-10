<template>
    <div class="container flex flex-column">
        <div class="form flex flex-column">
            <h2>Sign In</h2>
            <form class="flex flex-column">
                <input type="email" placeholder="Email">
                <input type="password" placeholder="Password">
                <button class="purple" type="submit">Login</button>
            </form>
        </div>
    </div>
</template>

<script setup>
const email = ref('');
const password = ref('');
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