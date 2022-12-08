import feedApi from "@/api/feed"

const state = {
    data: null,
    isLoading: false,
    error: null,
}

const getters = {
    data: state => {
        return state.data
    },
    error: state => {
        return state.error
    }
}

export const mutationsTypes = {
    getFeedStart: '[feed] Get feed start',
    getFeedSuccess: '[feed] Get feed success',
    getFeedFailure: '[feed] Get feed failure',
}

const mutations = {
    [mutationsTypes.getFeedStart](state){
        state.isLoading = true
    },
    [mutationsTypes.getFeedSuccess](state,payload){
        state.isLoading = false
        state.data = payload
    },
    [mutationsTypes.getFeedFailure](state){
        state.isLoading = true
    },
    
}

const actions = {
    getFeed(context, {apiUrl}){
        return new Promise(resolve => {
        context.commit(mutationsTypes.getFeedStart)
        feedApi.getFeed(apiUrl)
        .then(response =>{
            context.commit(mutationsTypes.getFeedSuccess, response.data)
            resolve(response.data)
        })
        .catch(()=> {
            context.commit(mutationsTypes.getFeedFailure)
        })
        })
    },
}

export default{
    state,
    mutations,
    actions,
    getters
}