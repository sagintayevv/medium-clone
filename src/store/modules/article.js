import articleApi from "@/api/article"

const state = {
    data: null,
    isLoading: false,
    error: null,
}

export const mutationsTypes = {
    getArticleStart: '[article] Get tag start',
    getArticleSuccess: '[article] Get tag success',
    getArticleFailure: '[article] Get tag failure',

    deleteArticleStart: '[article] Delete start',
    deleteArticleSuccess: '[article] Delete success',
    deleteArticleFailure: '[article] Delete failure',

}

const mutations = {
    [mutationsTypes.getArticleStart](state){
        state.isLoading = true
        state.data = null
    },
    [mutationsTypes.getArticleSuccess](state,payload){
        state.isLoading = false,
        state.data = payload
    },
    [mutationsTypes.getArticleFailure](state){
        state.isLoading = false,
        state.data = null
    },
    [mutationsTypes.deleteArticleStart](){},
    [mutationsTypes.deleteArticleSuccess](){},
    [mutationsTypes.deleteArticleFailure](){}
    
}

const actions = {
    getArticle(context, {slug}){
        return new Promise(resolve => {
            context.commit(mutationsTypes.getArticleStart, slug)
            articleApi.getArticle(slug)
            .then(article =>{
                context.commit(mutationsTypes.getArticleSuccess,article)
                resolve(article)
            })
            .catch(()=> {
                context.commit(mutationsTypes.getArticleFailure)
            })
        })
    },
    deleteArticle(context, {slug}){
        return new Promise(resolve => {
            context.commit(mutationsTypes.deleteArticleStart, slug)
            articleApi.deleteArticle(slug)
            .then(() => {
                context.commit(mutationsTypes.deleteArticleSuccess)
                resolve()
            })
            .catch(()=> {
                context.commit(mutationsTypes.deleteArticleFailure)
            })
        })
    }
}

export default{
    state,
    mutations,
    actions,
}