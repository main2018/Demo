import {createRouter, createWebHistory} from 'vue-router'

const Index = () => import('./pages/index.vue')
const Detail = () => import('./pages/detail.vue')

const routes = [
  {
    path: '/index',
    name: 'Index',
    component: Index,
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/index',
    // component: Index,
  }
]
const router = createRouter({
  history: createWebHistory('/a-vue3/test1/'),
  routes
})
export default router