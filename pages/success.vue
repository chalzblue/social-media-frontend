<template>
    <div class="success-container flex flex-column">
        <h1>Success.</h1>
        <p>Successfully authenticated with facebook. Redirecting...</p>
    </div>
</template>

<script setup>
onMounted(() => {
    console.log('success');
    setCookie('facebook_connected', 'true');
    navigateTo('/?facebook_connected=true');
})
</script>

<style lang="scss" scoped>
.success-container {
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
</style>