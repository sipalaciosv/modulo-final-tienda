<script setup>
import { computed } from 'vue';
import { cartStore } from '@/stores/simpleStore';

const props = defineProps({ open: Boolean });
const emit = defineEmits(['update:open']);

const items = computed(() => cartStore.state.items);
const total = computed(() => cartStore.total.value);

function close() { emit('update:open', false); }
function inc(it) { cartStore.setQty(it.id, it.qty + 1, it.stock); }
function dec(it) { cartStore.setQty(it.id, it.qty - 1, it.stock); }
function remove(id) { cartStore.remove(id); }
function clear() { cartStore.clear(); }
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-40 grid place-items-center bg-black/40 p-4"
    @click.self="close"
  >
    <div class="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl">
      <header class="flex items-center justify-between border-b p-4">
        <h3 class="text-lg font-semibold">🛒 Detalle del carrito</h3>
        <button class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100 transition" @click="close">✖</button>
      </header>

      <div v-if="!items.length" class="p-6 text-gray-600">Tu carrito está vacío.</div>

      <ul v-else class="max-h-[60vh] divide-y overflow-auto p-2">
        <li v-for="it in items" :key="it.id" class="grid grid-cols-1 gap-3 p-3 sm:grid-cols-12 sm:items-center">
          <span class="sm:col-span-5 font-medium">{{ it.name }}</span>
          <div class="sm:col-span-3 flex items-center gap-2">
            <button class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100 transition" @click="dec(it)" :disabled="it.qty <= 1">−</button>
            <input
              type="number"
              v-model.number="it.qty"
              @change="cartStore.setQty(it.id, it.qty, it.stock)"
              min="1"
              :max="it.stock"
              class="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
            />
            <button class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100 transition" @click="inc(it)" :disabled="it.qty >= it.stock">＋</button>
          </div>
          <span class="sm:col-span-3 font-semibold">$ {{ (it.price * it.qty).toLocaleString() }}</span>
          <div class="sm:col-span-1">
            <button class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100 transition w-full sm:w-auto" @click="remove(it.id)">Eliminar</button>
          </div>
        </li>
      </ul>

      <footer v-if="items.length" class="flex items-center gap-3 border-t p-4">
        <strong class="text-lg">Total: $ {{ total.toLocaleString() }}</strong>
        <div class="ml-auto flex items-center gap-2">
          <button class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200 transition" @click="clear">Vaciar carrito</button>
          <button class="inline-flex items-center gap-2 rounded-lg border border-gray-900 bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black transition" @click="close">Continuar</button>
        </div>
      </footer>
    </div>
  </div>
</template>
