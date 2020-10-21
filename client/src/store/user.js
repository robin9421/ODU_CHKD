import axios from '../axios';
// import axios from 'axios';
import auth from './auth'

const state = {
}

const actions = {
    getPatients({ commit }) {
        return new Promise((resolve, reject) => {
            axios().get('/user/getPatients').then(repsonse => {
                resolve(repsonse)
            }).catch(err => {
                reject(err)
            });
        })
    },
    getDoctors({ commit }) {
        return new Promise((resolve, reject) => {
            axios().get('/user/getDoctors').then(repsonse => {
                resolve(repsonse)
            }).catch(err => {
                reject(err)
            });
        })
    },
    addSurgery({ commit }, data) {
        return new Promise((resolve, reject) => {
            axios().post('/user/addSurgery', data).then(response => {
                resolve(response)
            }).catch(err => {
                reject(err)
            });
        })
    },
    changePassword({ commit }, data) {
        return new Promise((resolve, reject) => {
            axios().post(`/user/change/${auth.state.email}`, data).then(response => {
                console.log(response);
                resolve(response);
            }).catch(err => {
                reject(err)
            });
        })
    }
}

const mutations = {

}
const getters = {
}

export default {
    state, mutations, getters, actions
}