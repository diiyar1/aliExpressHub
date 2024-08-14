<template>
    <NuxtLayout >
        <div id="ShoppingCartPage" class="mt-10 max-w-[1200px] mx-auto px-2">
            <div v-if="!userStore.cart.length" class="h-[500px] flex items-center justify-center">
                <div class="pt-20">
                    <img class="mx-auto" width="400" src="https://static-00.iconduck.com/assets.00/shopping-cart-illustration-2048x1745-edotklsz.png" alt="cart image">
                    
                    <div class="text-xl text-center mt-4">No Items Yet</div>
                    <div v-if="!user" class="flex text-center">
                        <NuxtLink to="/auth" class="bg-[#fd374f] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4">
                            Sign In
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div v-else class="md:flex gap-4 justify-between mx-auto w-full">
                <div class="md:w-[65%]">
                    <div class="bg-white rounded-lg p-4">
                        <div class="text-2xl font-bold mb-2">
                            Shopping Cart ({{ userStore.cart.length }})
                        </div>
                    </div>

                    <div class="bg-[#feeeef] rounded-lg p-4 mt-4">
                        <div class="text-red-500 font-bold">Welcome Deal Applicable On 1 Item Only</div>
                    </div>

                    <div id="Items" class="bg-white rounded-lg p-4 mt-4">
                        <div v-for="product in userStore.cart">
                            <CartItem :product="product" 
                            :selectedArray="selectedArray" 
                            @selectedRadio="selectedRadioFunc"/>

                        </div>
                    </div>
                </div>

                <div class="md:hidden block my-4"/>

                <div class="md:w-[35%]">
                    <div id="Summary" class="bg-white rounded-lg p-4"> 
                        <div class="text-2xl font-extrabold mb-2">Summary</div>
                        <div class="flex items-center justify-between my-4">
                            <div class="font-semibold">Total</div>
                            <div class="text-2xl font-semibold">
                                $<span class="font-extrabold">{{ totalPriceComputed}}</span>
                            </div>
                        </div>
                        <button @click="goToCheckout()" class="flex items-center justify-center bg-[#fd374f] text-[21px] w-full font-semibold p-1.5 rounded-full mt-4">
                            Checkout
                        </button>
                    </div>

                    <div id="PaymentProtection" class="bg-white rounded-lg p-4 mt-4">
                        <div class="text-lg font-semibold mb-2">Payment Method</div>
                        <div class="flex items-center justify-start gap-8 my-4">
                            <div v-for="card in cards">
                                <img class="h-6" :src="card" alt="card">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()
const user = useSupabaseUser()

let selectedArray = ref([])

onMounted(() => {
    setTimeout(()=> userStore.isLoading = false, 200)
})

const cards = ref([
    'https://w7.pngwing.com/pngs/308/426/png-transparent-visa-logo-credit-card-visa-logo-payment-visa-blue-text-trademark-thumbnail.png',
    'https://upload.wikimedia.org/wikipedia/commons/7/72/MasterCard_early_1990s_logo.png',
    'https://freelogopng.com/images/all_img/1655977977paypal-logo-transparent.png',
    'https://download.logo.wine/logo/Apple_Pay/Apple_Pay-Logo.wine.png'
])

const totalPriceComputed = computed(() => {
    let price = 0
    userStore.cart.forEach (prod =>{
        price += prod.price
    })
    return price/100
})

const selectedRadioFunc = (e) => {
    if (!selectedArray.value.length){
        selectedArray.value.push(e)
        return
    }

    selectedArray.value.forEach((item, index) =>{
        if (e.id != item.id){
            selectedArray.value.push(e)
        }else{
            selectedArray.value.splice(index,1)
        }
    })

   
}


const goToCheckout = () => {
    console.log('Go to Checkout clicked');
    let ids = []
    userStore.checkout = []

    selectedArray.value.forEach(item => ids.push(item.id))

    let res = userStore.cart.filter((item) => {
        return ids.indexOf(item.id) != -1
    })

    res.forEach(item => userStore.checkout.push(toRaw(item)))

    console.log('Navigating to checkout...');
    return navigateTo('/checkout')
}

</script>
