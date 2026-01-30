<template>
  <section>
    <div class="flex flex-col gap-5">
      <h1>Regístrate</h1>
      <p>n</p>
    </div>
    <form @submit.prevent="registrarUsuario">
      <input type="text" placeholder="Correo electrónico" v-model="email" />
      <input type="password" placeholder="Contraseña" v-model="pass" />
      <input type="password" placeholder="Confirmar contraseña" v-model="confirmPassword" />
      <button type="submit" :disabled="cargando">
        {{ cargando ? 'Creando usuario...' : 'Registrarse' }}
      </button>
    </form>
    <p>
      ¿Ya tienes cuenta?
      <router-link to="/login"
        ><span class="text-bold text-[#007BFF]">Inicia sesión</span>
      </router-link>
    </p>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { registrar } from '@/servicios/auth'
import { sendEmailVerification } from 'firebase/auth'

const email = ref('')
const pass = ref('')
const confirmPassword = ref('')
const error = ref('')
const exito = ref('')
const cargando = ref(false)

const coinciden = computed(() => {
  return password.value === confirmPassword.value
})

const registrarUsuario = async () => {
  error.value = ''
  exito.value = ''

  // validacion básica
  if (!coinciden) {
    error.value = 'Las contraseñas no coinciden'
    return // para que acabe allí, y no siga ejecutando código
  }

  cargando.value = true
  const resultado = await registrar(email.value, pass.value)
  cargando.value = false

  // últimas comprobaciones
  if (resultado.ok) {
    exito.value = `✅ El usuario ${email.value} fue creado exitosamente ✅`
    
    // Limpiar el formulario
    email.value = ''
    pass.value = ''
    confirmPassword.value = ''
  } else {
    error.value = `❌ ¡Oh no! Error al crear usuario: ${resultado.error}`
    // Limpiar el formulario
    email.value = ''
    pass.value = ''
    confirmPassword.value = ''
  }
}
</script>

<style scoped lang="sass">
form
  display: flex
  flex-direction: column
  gap: 40px
  input
    border: 1px solid #007BFF
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
