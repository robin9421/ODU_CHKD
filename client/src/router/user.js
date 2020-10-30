// Container
import MainContainer from '../container/MainContainer';

import store from '../store/index.js'

// Views
import Profile from '../views/user/profile'
import AddUser from '../views/user/addUser'
import Details from '../views/user/detailsCordinator'
import AddSurgery from '../views/user/addSurgery'
import DetailSurgery from '../views/user/details'
import Change from '../views/user/changePass'
import EditSurgery from '../views/user/editSurgery'
import demo from '../views/user/demo'
import userStatusCheck from '../views/user/userStatusCheck'
import surgeryTypes from '../views/user/surgeryTypes'

export default {
    path: '/user',
    component: MainContainer,
    redirect: '/user/profile/addUser',
    children: [{
            path: '/user/profile/addUser',
            component: Profile,
            children: [{
                    path: '/user/profile/addUser',
                    component: AddUser
                },
                {
                    path: '/user/profile/change',
                    component: Change
                },
                {
                    path: '/user/profile/details',
                    component: Details
                },
                {
                    path: '/user/profile/addSurgery',
                    component: AddSurgery
                },
                {
                    path: '/user/profile/demo',
                    component: demo
                },
                {
                    path: '/user/profile/surgeryDetails',
                    component: DetailSurgery
                },
                {
                    path: '/user/profile/surgeryDetails/edit/:id',
                    component: EditSurgery
                },
                {
                    path: '/user/profile/userStatusCheck',
                    component: userStatusCheck
                },
                {
                    path: '/user/profile/surgeryTypes',
                    component: surgeryTypes
                },
            ]
        },

    ],
    meta: {
        requireAuth: true
    },
    beforeEnter: (to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requireAuth);
        if (requiresAuth && store.state.auth.token) {
            next();
        } else {
            next('/auth');
        }
    }
}