<template>
    <NuxtLayout >
        <div id="ItemPage" class="mt-10 max-w-[1200px] mx-auto px-2">
            <div class="md:flex gap-4  justify-between mx-auto w-full">
                <div class="md:w-[40%]">
                    <img 
                    v-if="currentImage"
                    class="rounded-lg object-fit" 
                    :src="currentImage" 
                    alt="item image"/>
                </div>
                <div class="md:w-[60%] bg-white rounded-lg p-3 mt-2 ">
                    <div v-if="product && product.data">
                        <p class="mb-2">{{product.data.title}}</p>
                        <p class="font-light text-[12px] mb-2">{{product.data.description}}</p>
                    </div>
                    <div class="flex items-center pt-1.5 ">
                        <span class="h-4 min-w-4 rounded-full p-0.5 bg-[#ffd000] mr-2">
                            <Icon name="material-symbols:star-rounded" class="mb-10" size="12"/>
                        </span>
                        <p class="text-[#ff5353]">Extra 5% off</p>
                    </div>
                    <div class="flex items-center justify-start my-2">
                        <Icon name="material-symbols:star-rounded" class="text-[#ff5353]" />
                        <Icon name="material-symbols:star-rounded" class="text-[#ff5353]" />
                        <Icon name="material-symbols:star-rounded" class="text-[#ff5353]" />
                        <Icon name="material-symbols:star-rounded" class="text-[#ff5353]" />
                        <Icon name="material-symbols:star-rounded" class="text-[#ff5353]" />
                        <span class="text-[13px] font-light ml-2">
                            reviews
                        </span>
                    </div>
                    <div class="border-b"/>

                    <div class="flex items-center justify-start gap-2 my-2">
                        <div class="text-xl font-bold">$ {{priceComputed}}</div>
                        <span class="bg-[#f5f5f5] border text-[#c08562] text-[9px] font-semibold px-1.5 rounded-sm"> 70% off</span>
                    </div>
                    <p class="text-[#009a66] text-xs font-semibold pt-1">
                        Free 11-day delvery over $8.28
                    </p>
                    <p class="text-[#009a66] text-xs font-semibold pt-1">
                        Free Shipping
                    </p>
                    <div class="py-2"/>
                    <button @click="addToCart()" :disabled="isInCart" class="px-6 py-2 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-[#ff851a] to-[#ffac2c]">
                        <div v-if="isInCart">Is Added</div>
                        <div v-else>Add To Cart</div>
                    </button>
                </div>
               
            </div>
            <div v-if="images[0] !=='' "
                     class="flex items-center justify-start mt-2">
                     <div v-for="image in images" >
                        <img 
                        @mouseenter="currentImage = image"
                        @mouseleave="currentImage = image"
                        width="70"
                        class="rounded-md object-fit border-[3px] cursor-pointer" 
                        :class="currentImage === image ? 'border-[#ff5353]' : '' "   
                        :src="image" alt="image placeholder">
                     </div>

            </div>
                
        </div>
    </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

const route = useRoute();

let product = ref(null) 

let currentImage = ref(null)




onBeforeMount(async () => {
    product.value = await useFetch(`/api/prisma/get-product-by-id/${route.params.id}`)
})

watchEffect( ()=>{
       if (product.value && product.value.data) {
        currentImage.value = product.value.data.url
        images.value[0] = product.value.data.url
        userStore.isLoading = false
       } 
    })
const isInCart = computed (()=>{
    let res = false
    userStore.cart.forEach(prod => {
        if(route.params.id == prod.id){
            res = true
        }
    })
    return res
})

const priceComputed = computed(()=>{
    if (product.value && product.value.data){
        return product.value.data.price / 100
    }
    return '0.00'
})

 const images = ref([
    '',
    'https://imgs.search.brave.com/6Mqce3jAl5BsMop4cX1osOISpBARZ2n77F3zSwxWf6A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/cGhvdG9ncmFwaHkt/cHJvZHVjdC1kb3du/bG9hZC5qcGc_d2lk/dGg9MTAwMCZmb3Jt/YXQ9cGpwZyZleGlm/PTAmaXB0Yz0w',
    'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyPM9n6Cizmh_-x663DF4Y9LZxxZzW9BrS_A&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQDQRlFiFtRhBXr26Re2JSe6oBN1cKeGpvgw&s',
    'https://media.istockphoto.com/id/1354674622/photo/beauty-cosmetic-skin-care-products.jpg?s=612x612&w=0&k=20&c=5Ho6iOauENOXugVxKK2ye8_RRctZwBcABVLvJI061os='
 ])

 const addToCart =()=>{
   userStore.cart.push(product.value.data)
 }
</script>

