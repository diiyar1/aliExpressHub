<template>
    <div class="flex justify-start my-2">
        <div class="my-auto">
            <div @mouseenter="isHover = true" 
                 @mouseleave="isHover = false"
                 class="flex items-center justify-start p-0.5 cursor-pointer">
                <div @click="isSelected = !isSelected" 
                     class="flex items-center justify-center h-4 w-4 rounded-full border p-0.5 pb-0.5 mr-2"
                    :class="[isHover ? 'border-[#fd374f]' : 'border-gray-300',
                            isSelected ? 'bg-[#fd374f]' : '']">
                    <div class="h-[8px] w-[8px] rounded-full bg-white"/>
                </div>
            </div>
        </div>
        <img class="rounded-md md:w-[125px] w-[90px]" :src="product.url" alt="pro image">
        <div class="pl-2 w-full overflow-hidden">
            <div class="flex items-center justify-between w-full ">
                <div class="flex items-center justify-between truncate">
                    <span class="sm:block hidden bg-[#fd374f] text-white text-[9px] font-semibold px-1.5 rounded-sm min-w-[80px]"> Welcome Desl </span>
                    <div class="truncate sm:pl-2 ">{{ product.title}}</div>
                </div>
                <button @click="removeFromCart()" class="mx-3 sm:block hidden -mt-0.5 hover:text-red-500">
                 <Icon name="material-symbols:delete-outline" size="20"/>  
                </button>
            </div>

            <div class="text-xl font-semibold">
                $<span class="font-bold">{{ product.price/100}}</span>
            </div>
            <p class="text-[#009a66] text-xs font-semibold pt-1">
                Free 11-day delivery over $8.28
            </p>
            <p class="text-[#009a66] text-xs font-semibold pt-1">
                Free Shipping
            </p>
            <div class="flex items-center justify-end">
                <button @click="removeFromCart()" class="sm:hidden block -mt-0.5 hover:text-red-500">
                    <Icon name="material-symbols:delete-outline" size="20"/>  
                   </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

const props = defineProps(['product','selectedArray'])
const {product,selectedArray} = toRefs(props)

const emit = defineEmits(['selectedRadio'])

let isHover = ref(false)
let isSelected = ref(false)

// remvoe item from cart
const removeFromCart = ()=>{
    userStore.cart.forEach((prod,index)=>{
        if(prod.id === product.value.id) {
            userStore.cart.splice(index,1)
        }
    })
}

watch(()=> isSelected.value, (val)=>{
    emit('selectedRadio',{id:product.value.id, val:val})
})
</script>

