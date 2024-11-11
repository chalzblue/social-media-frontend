<template>
    <div class="failed-container flex flex-column">
        <h1>Failed.</h1>
        <p>Failed to authenticate with facebook. Redirecting...</p>
    </div>
</template>

<script setup>
onMounted(() => {
    console.log('success');
    useCookie('facebook_connected').value = false;
    navigateTo('/?facebook_connected=false');
})
</script>

<style lang="scss" scoped>
.failed-container {
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
</style>