import {db} from '@/firebase/config.js'
import {
    addDoc, collection, getDocs
} from 'firebase/firestore'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const asignarTarea = async (datosTarea, uid) => {
    try {
        datosTarea.assigned = true
        const docRef = await addDoc(collection(db, 'employees', uid, 'tareas'), datosTarea)
        console.log(docRef)
        toast.success('Tarea asignada!',
            {
            position: "top-right",
            timeout: 1500,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
        }
        )
        return {
            ok:true
        }
    } catch (error) {
        toast.error('Error al asignar! ', {
            position: "top-right",
            timeout: 1500,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
        })
        console.log(error.message)
        return {ok:false, error: error.message}
    }
}

export const obtenerTareas = async (uid) => {
    try {
        const consulta = await getDocs(collection(db, 'employees', uid, 'tareas'))
        const tablaTareas = []
        consulta.forEach((doc) => {
            tablaTareas.push(doc.data())
            console.log(doc.id, ' => ', doc.data)
        })
        if (tablaTareas){
            return {
                ok:true,
                datos: tablaTareas
            }
        }
    } catch(error) {
        toast.error('Error al obtener la información ', {
            position: "top-right",
            timeout: 1500,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
        })
        return {
            ok: false,
            message: error.message
        }
    }
}


