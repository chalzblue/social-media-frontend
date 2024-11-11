<template>
    <div class="failed-container flex">
        <h1>Failed.</h1>
        <p>Failed to authenticate with facebook. Redirecting...</p>
    </div>
</template>

<script setup>
onMounted(() => {
    console.log('success');
    alert('Failed to authenticated with facebook.');
    navigateTo('/?facebook_connected=false');
})
</script>

<style lang="scss" scoped>
.failed-container {
    justify-content: center;
    align-items: center;
}
</style>