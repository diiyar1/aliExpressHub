<template>
    <div id="defaultLayout" class="w-full fixed z-50">
        <!-- nav bar -->
        <div id="TopMenu" class="w-full bg-[#fafafa] border-b md:block hidden">
            <ul class="flex items-center justify-end text-xs text-[#333333] font-light px-2 h-10 bg-[#fafafa] max-w-[1200px]">
                <li class="border-r border-gray-400 px-3 hover:text-[#ff4646] cursor-pointer">Sell On ALiExpress</li>
                <li class="border-r border-gray-400 px-3 hover:text-[#ff4646] cursor-pointer">Cookie Prefrences</li>
                <li class="border-r border-gray-400 px-3 hover:text-[#ff4646] cursor-pointer">Help</li>
                <li class="border-r border-gray-400 px-3 hover:text-[#ff4646] cursor-pointer">Buyer Protection</li>
                <li class=" px-3 hover:text-[#ff4646] cursor-pointer">
                    <Icon name="ic:sharp-install-mobile" size="17"/>
                    App
                </li>
                <li @mouseenter="isAccountMenu = true"
                    @mouseleave="isAccountMenu = false"
                    class="relative flex items-center px-2.5 hover:text-[#ff4646] h-full cursor-pointer"
                    :class="isAccountMenu ? 'bg-white border z-40 shadow-[0_15px_100px_40px_rgba(0,0,0,0.1)]'
                    : 'border border-[#fafafa]'">
                <Icon name="ph:user-thin" size="17" />
                Account
                <Icon name="mdi:chevron-down" size="15" class="ml-5" />
                
                    <div id="AccountMenu" v-if="isAccountMenu"
                        class=" bg-white absolute w-[220px] text-[#333333] z-40 top-[38px] -left-[106px] border-x border-b">
                        <div v-if="!user">
                            <div class="text-semibold text-[15px] my-4 px-3">
                                Welcome To ALiExpress!
                            </div>
                            <div class="flex items-center gap-1 px-3 mb-3">
                                <NuxtLink to="/auth" class="bg-[#ff4646] text-center w-full text-[16px] rounded-sm text-white font-semibold p-2">
                                    Login / Register
                                </NuxtLink>
                            </div>
                        </div>
                        <div class="border-b"/>
                        <ul class="bg-white">
                            <li @click="navigateTo('/orders')"
                                class="text-[13px] py-2 px-4 w-full hover:bg-gray-200">
                            My Orders
                            </li>
                            <li v-if="user"
                            @click="client.auth.signOut()"
                            class="text-[13px] py-2 px-4 w-full hover:bg-gray-200">
                                Sign Out
                            </li>
                        </ul>
                    </div>
                </li>

            </ul>
        </div>
        <!-- header = logo + seaarh bar + cart -->
         
        <div id="mainHeader"
             class="flex items-center w-full bg-white">
            <div class="flex lg:justify-start justify-between gap-10 max-w[1150px] w-full px-3 py-5 mx-auto">
                <!-- logo -->
                <NuxtLink to="/" class="min-w-[170px] ">
                    <img 
                     width="170"
                     src="https://1000logos.net/wp-content/uploads/2020/07/AliExpress-Logo-2010.png" 
                     alt="aliExpress Logog">
                </NuxtLink>
                <!-- search bar -->
                <div class="max-w-[700px] w-full md:block hidden">
                    <div class="relative">
                        <div class="flex items-center border-2 border-[#ff4646] rounded-md w-full">
                            <input type="text" placeholder="Kitchen Accessories" v-model="searchItem"
                            class="w-full placeholder-gray-400 text-sm pl-3 focus:outline-none"/>
                            <Icon name="eos-icons:loading" v-if="isSearching" size="25" class="mr-2"/>
                            <button class="flex items-center h-[100%] p-1.5 bg-[#ff4646]">
                                <Icon name="ph:magnifying-glass" size="20" class="text-[#ffffff]"/>
                                
                            </button>
                        </div>
                        <!-- cart -->
                        <div class="absolute bg-white max-w-[700px] h-auto w-full">
                            <div v-if="items && items.data"
                                 v-for="item in items.data" 
                            class="p-1">
                                <NuxtLink :to="`/item/${item.id}`"
                                          class="flex items-center justify-between w-full cursor-pointer hover:bg-[#fafafa]">
                                          <div class="flex items-center">
                                            <img :src="item.url" alt="item image" width="40" class="rounded-md">
                                            <div class="truncate ml-2">{{item.title}}</div>
                                          </div>
                                          <div class="truncate">${{ item.price / 100 }}</div>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
                <!--  -->
                <div @click="goTo('shoppingCart')" class="flex items-center">
                    <button
                           @mouseenter="isCartHover = true"
                           @mouseleave="isCartHover = false"
                           class="relative md:block hidden "
                           >
                        <span class="absolute flex items-center justify-center -right-[3px] top-0 bg-[#ff4646] h-[17px] min-w-[17px] text-xs text-white px-0.5 rounded-full">
                            {{ userStore.cart.length }}
                        </span>
                        <div class="min-w-[40px]" >
                            <Icon name="ph:shopping-cart-simple-light" size="33" 
                             :class=" [isCartHover ? 'text-[#ff4646]' : ''] "  />
                        </div>
                    </button>
                </div>
                <button
                 @click="userStore.isMenuOverlay = true"
                 class="md:hidden block rounded-full p-1.5 -mt-[4px] hover:bg-gray-200">
                    <Icon name="radix-icons:hamburger-menu" size="33"/>
                </button>
            </div>
        </div>
    </div>

    <Loading v-if="userStore.isLoading" />

    <div class="lg:pt-[150px] md:pt-[130px] pt-[80px]">
        <slot />
        
        <Footer v-if="!userStore.isLoading"/>
    </div>
</template>

<script  setup>
import Loading from '~/components/Loading.vue';
import Footer from '~/components/Footer.vue';
import { useUserStore } from '~/stores/user';

    const client = useSupabaseClient()
    const user = useSupabaseUser()

    const goTo = (url) =>{
    return navigateTo(`/${url}`)
}
     
   const userStore = useUserStore()
   let isAccountMenu = ref(false)
   let isCartHover = ref(false)
   let isSearching = ref(false)
   let searchItem = ref('')
   let items = ref(null)

   const searchByName = useDebounce( async()=>{
    isSearching.value = true 
    items.value = await useFetch(`/api/prisma/search-by-name/${searchItem.value}`)
    isSearching.value = false
   }, 100)

   watch (()=> searchItem.value , async()=>{
    if (!searchItem.value) {
        setTimeout(() => {
           items.value = ''
           isSearching.value = false
           return 
        }, 500);
    }
    return searchByName()
   })
</script>

