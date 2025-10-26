<script setup>
import { ref, onMounted, computed } from 'vue';
import { Products } from '@/services/products';
import { cartStore } from '@/stores/simpleStore';

const products = ref([]);
const loading = ref(true);
const q = ref('');
const qtyById = ref({});

onMounted(async () => {
  loading.value = true;
  products.value = await Products.all();
  qtyById.value = Object.fromEntries(products.value.map(p => [p.id, 1]));
  loading.value = false;
});

const filtered = computed(() => {
  const term = q.value.trim().toLowerCase();
  return products.value
    .filter(p => p.stock > 0)
    .filter(p => !term || p.name.toLowerCase().includes(term));
});

function addToCart(p) {
  const qty = Number(qtyById.value[p.id] || 1);
  cartStore.add(p, qty);
}
</script>

<template>
  <section class="space-y-4">
    <form class="flex gap-2" @submit.prevent>
      <input
        v-model="q"
        type="text"
        placeholder="Buscar producto por nombre..."
        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
      />
      <button
        type="submit"
        class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100 transition"
      >
        Buscar
      </button>
    </form>

    <div v-if="loading" class="text-gray-500">Cargando productos...</div>

    <div v-else class="grid [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))] gap-4">
      <article v-for="p in filtered" :key="p.id" class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-2">
        <img :src="p.image" :alt="p.name" class="h-32 w-full rounded-lg object-cover" />
        <h3 class="font-semibold">{{ p.name }}</h3>
        <p class="text-sm text-gray-600">Stock: {{ p.stock }}</p>
        <p class="text-lg font-bold">$ {{ p.price.toLocaleString() }}</p>
        <div class="flex items-center gap-2">
          <input
            type="number"
            min="1"
            :max="p.stock"
            v-model.number="qtyById[p.id]"
            class="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
          />
          <button
            class="inline-flex items-center gap-2 rounded-lg border border-gray-900 bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black transition"
            @click="addToCart(p)"
          >
            Agregar
          </button>
        </div>
      </article>

      <p v-if="!filtered.length" class="col-span-full text-center text-gray-500">
        No hay productos que coincidan con “{{ q }}”
      </p>
    </div>
  </section>
</template>
