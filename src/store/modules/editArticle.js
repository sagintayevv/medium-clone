import articleaApi from "@/api/article"

const state = {
    isSubmitting: false,
    validationErrors: null,
    isLoading: false,
    article: null
}

export const mutationsTypes = {
    updateArticleStart: "[updateArticle] Update Article Start",
    updateArticleSuccess: "[updateArticle] Update Article Success",
    updateArticleFailure: "[updateArticle] Update Article Failure",

    getArticleStart: "[updateArticle] Get Article Start",
    getArticleSuccess: "[updateArticle] Get Article Success",
    getArticleFailure: "[updateArticle] Get Article Failure",
}

const mutations = {
    [mutationsTypes.updateArticleStart](state){
        state.isSubmitting = true
        state.validationErrors = null
    },
    [mutationsTypes.updateArticleSuccess](state){
        state.isSubmitting = false
    },
    [mutationsTypes.updateArticleFailure](state, payload){
        state.isSubmitting = false,
        state.validationErrors = payload
    },
    [mutationsTypes.getArticleStart](state){
        state.isLoading = true
    },
    [mutationsTypes.getArticleSuccess](state,payload){
        state.isLoading = false
        state.article = payload
    },
    [mutationsTypes.getArticleFailure](state, payload){
        state.isLoading = false,
        state.validationErrors = payload
    }
}

const actions = {
    updateArticle(context,{slug,articleInput}){
        return new Promise(resolve => {
            context.commit(mutationsTypes.updateArticleStart)
            articleaApi.updateArticle(slug,articleInput).then(article => {
                context.commit(mutationsTypes.updateArticleSuccess)
                resolve(article)
            }).catch(result => {
                context.commit( mutationsTypes.updateArticleFailure, result.response.data.errors)
            })
        })
    },
    getArticle(context,{slug,articleInput}){
        return new Promise(resolve => {
            context.commit(mutationsTypes.getArticleStart)
            articleaApi.getArticle(slug)
            .then(article => {
                context.commit(mutationsTypes.getArticleSuccess,article)
                resolve(article)
            }).catch(() => {
                context.commit( mutationsTypes.getArticleFailure)
            })
        })
    },
}

export default{
    state,
    mutations,
    actions
}