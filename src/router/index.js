import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//解决重复点击路由的报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    children: [
      {
        path: '/admin/postadd',
        name: 'Postadd',
        component: () => import('@/views/Postadd.vue')
      },
      {
        path: '/admin/postedit',
        name: 'Postedit',
        component: () => import('@/views/Postedit.vue')
      },
      {
        path: '/admin/companyedit',
        name: 'Companyedit',
        component: () => import('@/views/Companyedit.vue')
      },
      {
        path: '/admin/useredit',
        name: 'Useredit',
        component: () => import('@/views/Useredit.vue')
      },
    ]
  },
  {
    path: '/admin/index',
    redirect: '/admin'
  },
  {
    path: '/*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
