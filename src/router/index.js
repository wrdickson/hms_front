import { createRouter, createWebHashHistory } from 'vue-router'

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
      path: '/FolioView/:id',
      name: 'FolioView',
      component: () => import('/src/views/FolioView.vue'),
      meta: { title: `Folio` }
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
      meta: {
        title: 'Reservation View'
      },
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
    },
    {
      path: '/XStateDemo',
      name: 'XStateDemo',
      component: () => import('/src/views/XStateDemo.vue')
    }
  ]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((toRoute, fromRoute, next) => {
  console.log('beforeEach()', toRoute, fromRoute)
  console.log(toRoute.params.id)
  if( toRoute.params.id) {
    window.document.title = toRoute.meta.title && toRoute.params.id ? toRoute.meta.title + toRoute.params.id : toRoute.meta.title;
  }
  next();
})

export default router