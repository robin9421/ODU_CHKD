// Container
import MainContainer from '../container/MainContainer';

// Views
import Login from '../views/auth/login'
import Verify from '../views/auth/verify'

export default {
    path: '/auth',
    component: MainContainer,
    redirect: '/auth/login',
    children: [
        {
            path: '/auth/login',
            component: Login,
        },
        {
            path: '/auth/verify/:token',
            component: Verify,
        },
    ]
}