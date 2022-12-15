import userProfileApi from "@/api/userProfile"

const state = {
    data: null,
    isLoading: false,
    error: null,
}

export const mutationsTypes = {
    getUserProfileStart: '[userProfile] Get user profile start',
    getUserProfileSuccess: '[userProfile] Get user profile success',
    getUserProfileFailure: '[userProfile] Get user profile failure',
}

const mutations = {
    [mutationsTypes.getUserProfileStart](state){
        state.isLoading = true
        state.data = null
    },
    [mutationsTypes.getUserProfileSuccess](state,payload){
        state.isLoading = false,
        state.data = payload
    },
    [mutationsTypes.getUserProfileFailure](state){
        state.isLoading = true,
        state.data = null
    },
    
}

const actions = {
    getUserProfile(context, {slug}){
        return new Promise(resolve => {
            context.commit(mutationsTypes.getUserProfileStart)
            userProfileApi
            .getUserProfile(slug)
            .then(userProfile =>{
                context.commit(mutationsTypes.getUserProfileSuccess,userProfile)
                resolve(userProfile)
            })
            .catch(()=> {
                context.commit(mutationsTypes.getUserProfileFailure)
            })
        })
    }
}

export default{
    state,
    mutations,
    actions,
}