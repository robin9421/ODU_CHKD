// Container
import MainContainer from '../container/MainContainer';

// Views
import login from '../views/auth/login'

export default {
    path: '/',
    component: MainContainer,
    redirect: '/auth/login',
    children: [{
        path: '/',
        component: login,
    }, ]
}