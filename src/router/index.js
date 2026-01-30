import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase/config'
import TaskBoardView from '@/views/TaskBoardView.vue'
import WorkspaceView from '@/views/WorkspaceView.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: TaskBoardView,
      meta: { requiresVerification: true }
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
      meta: { requiresVerification: true }
    }
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresVerification) {
    if (auth.currentUser?.emailVerified) {
      console.log(auth.currentUser?.emailVerified)
      next()
    } else {
      console.log(auth.currentUser?.emailVerified)
      next('/login')
      toast.error('No puedes acceder sin verificar tu email primero')
    }
  } else {
    next()
  }
})

export default router

