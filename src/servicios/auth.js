import { ref } from 'vue'
import { auth } from '@/firebase/config.js'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from 'firebase/auth'
import { useToast } from 'vue-toastification'

// createUserWithEmailAndPassword = crea un usuario con email y password
// onAuthStateChanged = vigila el estado de autenticación del usuario

// variable global del usuario
export let usuario = ref(null)
const toast = useToast()

// escuchar los cambios de la autenticación del usuario
onAuthStateChanged(auth, (userFirebase) => {
  if (auth.email) {
    toast.success('Bienvenido ' + auth?.email)
    usuario.value = userFirebase
  }
  
})

// registrar usuario
export const registrar = async (email, passwd) => {
  console.log(email)
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, passwd)
    // Enviamos email de verificación
    sendEmailVerification(email)
    toast.info('Revisa tu correo para poder ser verificado')
    return {
      ok: true,
      mensaje: 'usuario creado correctamente',
      usuario: userCredentials,
    }
  } catch (error) {
    toast.error('No se pudo registrar al usuario')
    return {
      ok: false,
      mensaje: 'no se pudo crear el usuario',
    }
  }
}

export const login = async (email, passwd) => {
  try {
    await signInWithEmailAndPassword(auth, email, passwd)
    console.log('sesión iniciada ✅', email)
    return {
      ok: true,
      mensaje: 'sesión iniciada correctamente',
    }
  } catch (error) {
    console.log('Ha habido un problema ❌', error)
    return {
      ok: false,
      mensaje: 'Error' + error.message,
    }
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
    console.log('✅ sesión cerrada')
    return {
      ok: true,
    }
  } catch (error) {
    console.log('❌ Error en logout')
    return {
      ok: false,
      error: error.message,
    }
  }
}

export const enviarEmailVerificacion = async (usuarioActual = null) => {
  try {
    const usuario = usuarioActual || auth.currentUser
    console.log(usuario)
    if (usuario.emailVerified) {
      console.log('✅ Email ya verificado')
      return {
        ok: true,
        mensaje: 'Email ya verificado',
      }
    } else {
      await sendEmailVerification(usuario, { url: window.location.origin + '/perfil' })
      return {
        ok: true,
        mensaje: 'Email de verificación enviado',
      }
    }
  } catch (error) {
    console.log('❌ Ha habido un problema al enviar el correo de verificación')
    return {
      ok: false,
      error: error.message,
    }
  }
}

// Comprobar si el usuario está autenticado

export const estaAutenticado = () => {
  console.log(usuario.value) // 'null' cuando entro a las rutas protegidas
  return usuario.value !== null
}

// Obtener usuario, si existe
export const obtenerUsuario = () => {
  return usuario.value
}
