<template>
    <div id="MenuOverlay" class="fixed z-50 bottom-0 h-full w-full bg-white px-3 ">
        <div class="flex items-center justify-between py-5">
            <NuxtLink to="/" @click="userStore.isMenuOverlay = false">
                <img width="170" src="https://1000logos.net/wp-content/uploads/2020/07/AliExpress-Logo-2010.png" alt="aliexpress logo">
            </NuxtLink>
            <button @click="userStore.isMenuOverlay = false" class="rounded-full p-1 hover:bg-gray-200">
                <Icon name="mdi:close" size="30"/>
            </button>
        </div>

        <div class="flex items-center justify-between pt-5">
            <ul class="w-full">
                <LI @click="goTo('orders')" class="relative flex items-center justify-between py-2.5 border-b px-3  hover:bg-gray-100 cursor-pointer">
                    <div class="flex items-center text-[20px] space-x-3 font-semibold">
                        <Icon name="ph:pen-light" size="28" />
                        <span>My Orders</span>
                    </div>
                </LI>
                <LI @click="goTo('shoppingCart')" class="relative flex items-center justify-between py-2.5 border-b px-3  hover:bg-gray-100 cursor-pointer">
                    <div class="mt-4 flex items-center text-[20px] space-x-3 font-semibold">
                        <Icon name="ph:shopping-cart-simple-light" size="28" />
                        <span>Cart</span>
                    </div>
                    <div class="flex items-center justify-center bg-[#ff4646] h-[35px] min-w-[35px] text-lg text-white rounded-full">
                        {{ userStore.cart.length }}
                    </div>
                </LI>
                <LI v-if="false" @click="signOut()" class="relative flex items-center justify-between py-2.5 border-b px-3  hover:bg-gray-100 cursor-pointer">
                    <div class="flex items-center text-[20px] space-x-3 font-semibold">
                        <Icon name="ph:sign-out-light" size="28" />
                        <span>Sign Out</span>
                    </div>
                </LI>
                <LI v-else @click="signIn()" class="relative flex items-center justify-between py-2.5 border-b px-3  hover:bg-gray-100 cursor-pointer">
                    <div class="flex items-center text-[20px] space-x-3 font-semibold">
                        <Icon name="ph:sign-in-light" size="28" />
                        <span>Sign In / Register</span>
                    </div>
                </LI>
            </ul>
        </div>
    </div>
</template>

<script  setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

const client = useSupabaseClient()
const user = useSupabaseUser()


const goTo = (url) =>{
    userStore.isMenuOverlay = false
    return navigateTo(`/${url}`)
}

const signOut = () => {
    client.auth.signOut()
    userStore.isMenuOverlay = false
    return navigateTo('/')
}

const signIn = () => {
    client.auth.signIn()
    userStore.isMenuOverlay = false
    return navigateTo('/auth')
}
</script>

