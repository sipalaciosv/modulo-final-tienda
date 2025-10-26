<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Auth } from '@/services/auth';
import { authStore } from '@/stores/simpleStore';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();

async function submit() {
  error.value = '';
  loading.value = true;
  try {
    const user = await Auth.login({ email: email.value, password: password.value });
    authStore.login(user);
    router.push({ name: 'home' });
  } catch (e) {
    error.value = e?.message || 'Error al iniciar sesión';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="mx-auto max-w-md space-y-4">
    <h2 class="text-2xl font-semibold">Login</h2>
    <form class="space-y-3" @submit.prevent="submit">
      <label class="block space-y-1">
        <span class="text-sm text-gray-700">Correo</span>
        <input
          type="email"
          v-model.trim="email"
          placeholder="usuario1@mitienda.com"
          required
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
        />
      </label>

      <label class="block space-y-1">
        <span class="text-sm text-gray-700">Contraseña</span>
        <input
          type="password"
          v-model="password"
          placeholder="password"
          required
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
        />
      </label>

      <button
        class="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-gray-900 bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black transition"
        type="submit"
        :disabled="loading"
      >
        {{ loading ? 'Ingresando...' : 'Ingresar' }}
      </button>

      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    </form>
  </div>
</template>
