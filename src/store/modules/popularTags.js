import tagApi from "@/api/popularTags"

const state = {
    data: null,
    isLoading: false,
    error: null,
}

export const mutationsTypes = {
    getPopularTagStart: '[tags] Get tag start',
    getPopularTagSuccess: '[tags] Get tag success',
    getPopularTagFailure: '[tags] Get tag failure',
}

const mutations = {
    [mutationsTypes.getPopularTagStart](state){
        state.isLoading = true
        state.data = null
    },
    [mutationsTypes.getPopularTagSuccess](state,payload){
        state.isLoading = false,
        state.data = payload
    },
    [mutationsTypes.getPopularTagFailure](state){
        state.isLoading = true,
        state.data = null
    },
    
}

const actions = {
    getPopularTags(context){
        return new Promise(resolve => {
            context.commit(mutationsTypes.getPopularTagStart)
            tagApi.getPopularTags()
            .then(tags =>{
                context.commit(mutationsTypes.getPopularTagSuccess,tags)
                resolve(tags)
            })
            .catch(()=> {
                context.commit(mutationsTypes.getPopularTagFailure)
            })
        })
    }
}

export default{
    state,
    mutations,
    actions,
}