<template>
  <section class="w-full h-full">
    <select v-model="filtro">
        <option value="" selected disabled>Seleccione una categoría</option>
        <option value="todas">Todas</option>
        <option value="completadas">Completadas</option>
        <option value="pendientes">Pendientes</option>
    </select>
    <article v-if="lista_filtrada?.length">
        <div v-for="tarea in lista_filtrada" :key="tarea.todo">
            <h3>{{ tarea.todo }}</h3>
            <p v-if="tarea.completed">✅</p>
            <button v-else-if="!tarea?.assigned" @click="asignarTarea(tarea, auth.currentUser.uid)">Asignar tarea</button>
            <p v-else> Asignada</p>
        </div>
    </article>
    <article v-else-if="cargando">
        <h2>Cargando...</h2>
    </article>
    <article v-else>
        <h2>No tienes tareas añadidas</h2>
    </article>
    <ButtonComponent/>
  </section>
</template>

<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue';
import { asignarTarea } from '@/servicios/tareas';
import { useTareaStore } from '@/stores/tareasStore';
import { onMounted, watch, ref } from 'vue';
import { auth } from '@/firebase/config';

const lista_filtrada = ref([])
const filtro = ref('')
const tareas = useTareaStore()
const cargando = ref(true)

watch(filtro, (newValue) => {
 if (newValue == 'todas') {
    lista_filtrada.value = tareas.tareas.todos
    console.log(lista_filtrada.value)
 }

 if (newValue == 'completadas') {
    lista_filtrada.value = tareas.tareas.todos.filter(t => t.completed)
    console.log(lista_filtrada.value)
 }

 if (newValue == 'pendientes') {
    lista_filtrada.value = tareas.tareas.todos.filter(t => !t.completed)
 }
})

onMounted(() => {
    tareas.getData()
    cargando.value = ref(false)
})
</script>

<style scoped lang="sass">

</style>