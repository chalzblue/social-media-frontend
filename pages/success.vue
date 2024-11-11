<template>
    <div class="success-container flex flex-column">
        <h1>Success.</h1>
        <p>Successfully authenticated with facebook. Redirecting...</p>
    </div>
</template>

<script setup>
onMounted(() => {
    console.log('success');
    alert('Successfully authenticated with facebook.');
    navigateTo('/?facebook_connected=true');
})
</script>

<style lang="scss" scoped>
.success-container {
    justify-content: center;
    align-items: center;
}
</style>