<template>
  <section class="w-full h-full">
    <article v-if="tareas.tareas.todos.length">
        <div v-for="tarea in tareas.tareas.todos" :key="tarea.todo">
            <h3>{{ tarea.todo }}</h3>
            <p v-if="tarea.completed">✅</p>
            <p v-else>Pendiente</p>
            <button @click="">Asignar tarea</button>
        </div>
    </article>
    <article v-else-if="cargando">
        <h2>Cargando...</h2>
    </article>
    <article v-else>
        <h2>No tienes tareas añadidas</h2>
    </article>
  </section>
</template>

<script setup>
import { useTareaStore } from '@/stores/tareasStore';
import { onMounted } from 'vue';

const tareas = useTareaStore()

onMounted(async () => {
    let cargando = true
    tareas.getData()
    cargando = false
})
</script>

<style scoped lang="sass">

</style>