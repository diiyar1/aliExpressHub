<template>
  <div class="z-[-1] bg-[#f2f2f2] w-full h-[100vh]">
    <NuxtPage />
  </div>
  <MenuOverlay :class="[
    {'max-h-[100vh] transition-all duration-200 ease-in visible' : userStore.isMenuOverlay},
    {'max-h-0 transition-all duration-200 ease-out invisible' : !userStore.isMenuOverlay}
  ]" />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '~/stores/user';
import MenuOverlay from '~/components/MenuOverlay.vue';

const userStore = useUserStore();
const route = useRoute();

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : '');

onMounted(() => {
  userStore.isLoading = false;
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      windowWidth.value = window.innerWidth;
    });
  }
});

watch(() => windowWidth.value, () => {
  if (windowWidth.value >= 800) {
    userStore.isMenuOverlay = false;
  }
});

watch(() => route.fullPath, () => {
  userStore.isLoading = true;
});
</script>
