<template>
  <section class="w-full h-full bg-[#f3f4f6]">
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
section
  padding: 2rem
  max-width: 900px
  margin: 0 auto

select
  padding: 0.6rem 1rem
  border-radius: 8px
  border: 1px solid #ccc
  font-size: 1rem
  margin-bottom: 1.5rem
  outline: none

  &:focus
    border-color: #4f46e5

article
  display: flex
  flex-direction: column
  gap: 1rem
  margin-bottom: 2rem

article > div
  background: #f9fafb
  border-radius: 10px
  padding: 1rem 1.2rem
  display: flex
  align-items: center
  justify-content: space-between
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06)

h3
  margin: 0
  font-size: 1.05rem
  font-weight: 500
  color: #1f2937

button
  padding: 0.4rem 0.8rem
  border-radius: 6px
  border: none
  background: #4f46e5
  color: white
  cursor: pointer
  font-size: 0.9rem
  transition: background 0.2s ease

  &:hover
    background: #4338ca

p
  margin: 0
  font-size: 0.95rem

article > h2
  text-align: center
  color: #6b7280

</style>