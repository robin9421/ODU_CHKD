import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './home';
import auth from './auth';
import user from './user';

Vue.use(VueRouter)



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    home, auth, user
  ]
})

export default router