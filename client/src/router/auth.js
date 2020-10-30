// Container
import MainContainer from '../container/MainContainer';

// store
import store from '../store/index.js';

// Views
import Login from '../views/auth/login'
import Verify from '../views/auth/verify'

export default {
    path: '/auth',
    component: MainContainer,
    redirect: '/auth/login',
    children: [{
            path: '/auth/login',
            component: Login,
        },
        {
            path: '/auth/verify/:token',
            component: Verify,
        },
    ],
    beforeEnter: (to, from, next) => {
        if (store.state.auth.token) {
            next('/user');
        } else {
            next();
        }
    }
}