<script setup>
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">

    <Navbar />
    <main class="container mx-auto py-6 px-4">
      <router-view />
    </main>
  </div>
</template>
