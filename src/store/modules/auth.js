
import authApi from '@/api/auth'

const state = {
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null
}

const getters = {
    currentUser: state => {
        return state.currentUser
    },
    isLoggedIn: state => {
        return Boolean(state.isLoggedIn)
    },
    isAnonymus: state => {
        return state.isLoggedIn == false
    }
}

const mutations = {
    registerStart(state){
        state.isSubmitting = true
        state.validationErrors = null
    },
    registerSuccess(state, payload){
        state.isSubmitting = false
        state.currentUser = payload
    },
    registerFailure(state,payload){
        state.isSubmitting = false
        state.validationErrors = payload
    },
    loginStart(state){
        state.isSubmitting = true
        state.validationErrors = null
    },
    loginSuccess(state, payload){
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    loginFailure(state,payload){
        state.isSubmitting = false
        state.validationErrors = payload
    },
    getCurrentUserStart(state){
        state.isLoading = true
    },
    getCurrentUserSuccess(state, payload){
        state.isLoading = false,
        state.currentUser = payload,
        state.isLoggedIn = true
    },
    getCurrentUserFailure(state){
        state.isLoading = false,
        state.isLoggedIn = false,
        state.currentUser = null
    }
}

const actions = {
    register(context,credentials) {
        return new Promise (resolve =>{
            context.commit('registerStart')
            authApi
            .register(credentials)
            .then(response => {
                context.commit('registerSuccess',response.data.user)
                window.localStorage.setItem("accessToken" ,response.data.user.token)
                resolve(response.data.user)
            })
            .catch(result => {
                context.commit('registerFailure', result.response.data.errors)
            })
        })
    },

    login(context,credentials) {
        return new Promise (resolve =>{
            context.commit('loginStart')
            authApi
            .login(credentials)
            .then(response => {
                context.commit('loginSuccess',response.data.user)
                window.localStorage.setItem("accessToken" ,response.data.user.token)
                resolve(response.data.user)
            })
            .catch(result => {
                context.commit('loginFailure', result.response.data.errors)
            })
        })
    },
    
    getCurrentUser(context) {
        return new Promise (() => {
            context.commit('getCurrentUserStart')
            authApi
            .getCurrentUser()
            .then(response => {
                context.commit('getCurrentUserSuccess',response.data.user)
            })
            .catch(result => {
                context.commit('getCurrentUserFailure', result.response.data.errors)
            })
        })
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}