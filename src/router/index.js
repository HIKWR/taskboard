import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase/config'
import TaskBoardView from '@/views/TaskBoardView.vue'
import WorkspaceView from '@/views/WorkspaceView.vue'
import { useToast } from 'vue-toastification'
import { onAuthStateChanged } from 'firebase/auth'

const getCurrentUser = () => {
  return new Promise ((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      user => {
        unsubscribe(),
        resolve(user)
      },
      reject
    )
  })
} 

const toast = useToast()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: TaskBoardView,
      meta: { requiresVerification: true, requiresLogin: true }
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/register',
      component: RegisterView
    },
    {
      path: '/workspace',
      component: WorkspaceView,
      meta: { requiresVerification: true, requiresLogin: true }
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser()

  if (!to.meta.requiresLogin) {
    return next()
  }

  if (!user) {
    if (to.path !== '/login') {
      toast.error('No puedes continuar si iniciar sesión')
      return next('/login')
    } else {
      return next()
    }
  }

  if (to.meta.requiresVerification && !user.emailVerified) {
    toast.error('No puedes acceder sin haber verificado tu correo')
    return next('/login')
  } 

  next()
})

export default router

