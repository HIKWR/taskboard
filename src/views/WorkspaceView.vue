<template>
  <section>
    <article v-if="lista_tareas">
        <div v-for="tarea in lista_tareas" :key="tarea.id">
            <h3>{{ tarea.todo }}</h3>
            <p v-if="tarea.completed">✅</p>
        </div>
    </article>
    
  </section>
</template>

<script setup>
import { obtenerTareas } from '@/servicios/tareas';
import { onMounted, ref } from 'vue';

const lista_tareas = ref([])
const cargando = ref(true)

onMounted(async () => {
    lista = obtenerTareas()
    lista_tareas.value = lista.datos
    cargando.value = false
    console.log(lista_tareas.value)
})
</script>

<style scoped lang="sass">

</style>