<template>
  <section class="bg-[#cbcccf] w-full h-full">
    <article v-if="lista_tareas">
        <div v-for="tarea in lista_tareas" :key="tarea.id">
            <h3>{{ tarea.todo }}</h3>
            <p v-if="tarea.completed">✅</p>
        </div>
    </article>
    <ButtonComponent/>
  </section>
</template>

<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import { auth } from '@/firebase/config'
import { obtenerTareas } from '@/servicios/tareas'
import { onMounted, ref } from 'vue'

const lista_tareas = ref([])
const cargando = ref(true)

onMounted(async () => {
    const lista = await obtenerTareas(auth.currentUser.uid)
    console.log(lista)
    lista_tareas.value = lista.datos
    cargando.value = false
    console.log(lista_tareas.value)
})
</script>

<style scoped lang="sass">
section
  padding: 2rem
  max-width: 800px
  margin: 0 auto

article
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))
  gap: 1rem
  margin-bottom: 2rem

article > div
  background: #ffffff
  border-radius: 12px
  padding: 1rem
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)
  transition: transform 0.2s ease, box-shadow 0.2s ease

  &:hover
    transform: translateY(-3px)
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12)

h3
  margin: 0 0 0.5rem
  font-size: 1.1rem
  font-weight: 600
  color: #333

p
  font-size: 1.2rem

button
  padding: 0.4rem 0.8rem
  border-radius: 6px
  border: none
  background: #4f46e5
  color: white
  cursor: pointer
  font-size: 0.9rem
  transition: background 0.2s ease

</style>