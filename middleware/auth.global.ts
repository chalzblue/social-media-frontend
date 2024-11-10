export default defineNuxtRouteMiddleware((to, from) => {
    // Use useCookie to check the access token
    const accessToken = useCookie('accessToken').value;
    if(!accessToken && to.path !== '/login') {
        return navigateTo('/login')
    }
    
    if(accessToken && to.path === '/login') {
        return navigateTo('/')
    }
});