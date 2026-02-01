<template>
  <button class="w-3 h-2 bg-[##007BFF] text-white rounded-md" @click="logout">Cerrar sesión</button>
</template>

<script setup>
import { logout } from '@/servicios/auth';
</script>

<style scoped lang="sass">

</style>