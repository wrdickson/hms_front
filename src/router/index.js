import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
      path: '/',
      name: 'Blank',
      component: () => import('/src/views/Home.vue')
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: () => import('/src/views/Dashboard/Dashboard.vue')
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import('/src/views/Home.vue')
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('/src/views/Login.vue')
    },
    {
      path: '/Logoff',
      name: 'Logoff',
      component: () => import('/src/views/Logoff.vue')
    },
    {
      path: '/resView3',
      name: 'resView3',
      component: () => import('/src/views/resView3/resView3.vue')
    },
    {
      path: '/houseAccountView',
      name: 'houseAccountView',
      component: ()=> import('/src/views/HouseAccount/HouseAccount.vue')
    },
    {
      path: '/ShiftReport',
      name: 'ShiftReport',
      component: () => import('/src/views/ShiftReport/ShiftReport.vue')
    },
    {
      path: '/PeriodSales',
      name: 'PeriodSales',
      component: () => import('/src/views/PeriodSales/PeriodSales.vue')
    }
  ]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router