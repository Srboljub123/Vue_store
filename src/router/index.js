import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import store from '../store.js';

Vue.use(VueRouter)

const routes = [
  {
    path: '/seleziona-mercato',
    name: 'Selezione Mercato',
    component: () => import('../views/Store.vue'),
    meta: {
      hideNavbar: true,
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    
  },
  {
    path: '/area-studenti',
    name: 'Area Studenti',
    component: () => import('../components/AreaStudenti.vue'),
    
  },
  {
    path: '/chi-siamo',
    name: 'Chi Siamo',
    component: () => import('../views/About.vue'),
   
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/Blog.vue'),
    
  },
  {
    path: '/articolo/:id',
    name: 'Articolo',
    component: () => import('../components/SinglePosts.vue'),
    
  },
  {
    path: '/profilo',
    name: 'Profilo',
    component: () => import('../components/Profile.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue'),
    
  },
  {
    path: '/lost-password',
    name: 'Password Dimenticata',
    component: () => import('../components/LostPassword.vue'),
  },
  {
    path: '/registrati',
    name: 'Registrati',
    component: () => import('../components/Register.vue'),
    
  },
  {
    path: '/prodotto/:id',
    name: 'Prodotto',
    component: () => import('../components/SingleProduct.vue'),
    
  },
  {
    path: '/categorie',
    name: 'Categorie Prodotti',
    component: () => import('../components/ProductCategories.vue'),
   
  },
    {
    path: '/categorie-mercati-produttori/:id',
    name: 'Categorie Mercati Produttori',
    component: () => import('../components/LastProduttoriByCategories.vue'),
   
  },
  {
    path: '/categorie-prodotti-venditori/:id',
    name: 'Prodotti Categorie Venditori',
    component: () => import('../components/ProductByVendorCategories.vue'),
   
  },
  {
    path: '/prodotti-venditori/:id',
    name: 'Prodotti Venditori',
    component: () => import('../components/VendorProduct.vue'),
   
  },
  {
    path: '/produttori',
    name: 'Produttori',
    component: () => import('../components/LastProduttori.vue'),
   
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../components/Checkout.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/contatti',
    name: 'Contatti',
    component: () => import('../views/Contact.vue'),
    
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('selected_store') == null && to.path !== '/seleziona-mercato') {
    next({
      path: '/seleziona-mercato',
    })
  } else {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        next()
        return
      }
      next('/login')
    } else {
      next()
    }
  }
})


export default router
