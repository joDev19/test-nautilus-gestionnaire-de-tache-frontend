import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Auth/Login.vue'
import Register from '@/views/Auth/Register.vue'
import Tasks from '@/views/App/Tasks.vue'
import TaskShow from '@/views/App/TaskShow.vue'
import TaskCreate from '@/views/App/TaskCreate.vue'
import Cookies from 'js-cookie'
import Dashboard from '@/views/App/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/',
      redirect: { name: 'login' }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiredAuth: true,
        activeName: 'dashboard'
      }
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks,
      meta: {
        requiredAuth: true,
        activeName: 'tasks'
      }
    },
    {
      path: '/tasks/create/:id?',
      name: 'task-create',
      component: TaskCreate,
      props: true,
      meta: {
        requiredAuth: true,
        activeName: 'tasks'
      }
    },
    {
      path: '/tasks/show/:id',
      name: 'task-show',
      component: TaskShow,
      props: true,
      meta: {
        requiredAuth: true,
        activeName: 'tasks'
      }
    },
  ],
})
const isAuthenticated = () => {
  return Cookies.get('gestion_des_tache_is_auth');
};
router.beforeEach(async (to, from) => {
  if (to.meta.requiredAuth === true) {
    if (!isAuthenticated()
    ) {
      
      return { name: 'login' }
    }

  }
})
export default router
