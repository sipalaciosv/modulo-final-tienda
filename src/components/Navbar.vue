<script setup>
import { ref, computed } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import CartDetail from './CartDetail.vue';
import { authStore, cartStore } from '@/stores/simpleStore';

const router = useRouter();
const isOpenCart = ref(false);
const isAuth = computed(() => authStore.isAuth.value);
const user = computed(() => authStore.state.user);
const cartCount = computed(() => cartStore.count.value);

function goLogin() { router.push({ name: 'login' }); }
function logout() { authStore.logout(); router.push({ name: 'home' }); }
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur">
    <nav class="container mx-auto flex items-center gap-3 py-3 px-4">
      <RouterLink to="/home" class="text-lg font-bold tracking-tight">🛍️ Tienda</RouterLink>

      <div class="ml-auto flex items-center gap-2">
        <button
          class="relative inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100 transition"
          @click="isOpenCart = true"
        >
          🛒 Carrito
          <span
            v-if="cartCount"
            class="absolute -right-2 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gray-900 px-1 text-xs font-semibold text-white"
          >{{ cartCount }}</span>
        </button>

        <button
          v-if="!isAuth"
          class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100 transition"
          @click="goLogin"
        >
          Login
        </button>

        <div v-else class="flex items-center gap-3">
          <span class="hidden sm:inline text-sm text-gray-600">Hola, {{ user?.name }}</span>
          <button
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100 transition"
            @click="logout"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  </header>

  <CartDetail v-model:open="isOpenCart" />
</template>
