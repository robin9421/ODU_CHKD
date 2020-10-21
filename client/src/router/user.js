// Container
import MainContainer from '../container/MainContainer';

// Views
import Profile from '../views/user/profile'
import AddUser from '../views/user/addUser'
import Details from '../views/user/detailsCordinator'
import AddSurgery from '../views/user/addSurgery'
import DetailSurgery from '../views/user/details'
import Change from '../views/user/changePass'
import EditSurgery from '../views/user/editSurgery'
import demo from '../views/user/demo'

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
                }
            ]
        },

    ]
}