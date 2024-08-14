<template>
    <div id="AuthPage" class="w-full h-[100vh] bg-white">
        <div class="w-full flex items-center justify-center p-5 border-b border-gray-300">
            <NuxtLink to="/" class="min-w-[170px]">
                <img width="170" src="https://1000logos.net/wp-content/uploads/2020/07/AliExpress-Logo-2010.png" alt="aliexpress logo">
            </NuxtLink>
        </div>
      
        <div class=" py-5">
            <div class="text-center my-6">Login / Register</div>

            <button @click="login('google')" class=" mt-4 flex items-center justify-center gap-3 p-1.5  w-full border hover:bg-gray-200 rounded-full text-lg font-semibold">
                <img class="w-10 min-w-10 h-10" 
                src="https://w7.pngwing.com/pngs/360/842/png-transparent-google-icon-hd-logo.png" alt="google logo">
                <div>Google</div>
            </button>
            <button @click="login('gitHub')" class="mt-4 flex items-center justify-center gap-3 p-1.5  w-full border hover:bg-gray-200 rounded-full text-lg font-semibold">
                <img class="w-10 min-w-10 h-10" 
                src="https://w7.pngwing.com/pngs/93/461/png-transparent-github-computer-icons-logo-readme-github-logo-monochrome-computer-wallpaper-thumbnail.png" alt="google logo">
                <div>GitHub</div>
            </button>
        </div>
    </div>
</template>

<script setup>

const client = useSupabaseClient()
const user = useSupabaseUser()


watchEffect (()=> {
    if (user.value) {
        return navigateTo('/' )
    }
})

const login = async (prov) => {
    const { data, error } = await client.auth.signInWithOAuth({
        provider: prov,
    })

    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Data:", data);
    }
}
</script>

