<template>
  <section>
    <div class="flex flex-col gap-5">
      <h1>Iniciar sesión</h1>
      <p>Para acceder al formulario, debes registrarte primero</p>
    </div>
    <form @submit.prevent="iniciarSesion">
      <input type="text" placeholder="Correo electrónico" v-model="email" />
      <input type="password" placeholder="Contraseña" v-model="pass" />
      <button type="submit">Acceder</button>
    </form>
    <p>
      ¿No tienes cuenta?
      <router-link to="/register"
        ><span class="text-bold text-[#007BFF]">Regístrate</span>
      </router-link>
    </p>
  </section>
</template>

<script setup>
import { login } from '@/servicios/auth.js'
import { enviarEmailVerificacion } from '@/servicios/auth.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const pass = ref('')
const error = ref('')
const exito = ref('')
const cargando = ref(false)

const iniciarSesion = async () => {
  console.log(email.value, pass.value)
  error.value = ''
  exito.value = ''
  cargando.value = true
  const resultado = await login(email.value, pass.value)
  const usuario = resultado.usuario
  const respuestaEmail = enviarEmailVerificacion(usuario)
  if (respuestaEmail.ok) {
    exito.value = '✅'
  } else {
    exito.value = '❌'
  }
  cargando.value = false

  if (resultado.ok) {
    exito.value = `✅ El usuario ${email.value} fue logueado exitosamente ✅`
    setTimeout(() => {
      router.push('/')
    }, 500)
  } else {
    error.value = `❌ ¡Oh no! Error al iniciar sesión`
  }
}
</script>

<style scoped lang="sass">
form
  display: flex
  flex-direction: column
  gap: 40px
  input
    height: 45px
    width: 125%
    padding-left: 15px
    font-size: 20px
  button
    font-size: 20px
    height: 45px
    width: 50%
p
  font-size: 20px
  span
    font-weight: bold
h1
  font-weight: bold
  color: #007BFF
  font-size: 40px
section
  margin-left: 35px
  display: flex
  justify-content: center
  align-items: start
  flex-direction: column
  padding: 50px
  height: 100vh
  gap: 70px
button
  color: white
  background: #007BFF
  border-radius: 5px
input
  border-radius: 5px
  border: 1px solid #007BFF
</style>
