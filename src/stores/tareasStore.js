import axios from "axios";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTareaStore = defineStore('tareas', () => {
    let tareas = ref([])

    const getData = async () => {
        let data = await axios.get('https://dummyjson.com/todos')
        console.log(data.data)
        tareas.value = data.data
    }

    return { tareas, getData }
})