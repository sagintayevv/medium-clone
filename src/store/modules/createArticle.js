import articleaApi from "@/api/article"

const state = {
    isSubmitting: false,
    validationErrors: null
}

export const mutationsTypes = {
    createArticleStart: "[createArticle] Create Article Start",
    createArticleSuccess: "[createArticle] Create Article Success",
    createArticleFailure: "[createArticle] Create Article Failure",
}

const mutations = {
    [mutationsTypes.createArticleStart](state){
        state.isSubmitting = true
    },
    [mutationsTypes.createArticleSuccess](state){
        state.isSubmitting = false
    },
    [mutationsTypes.createArticleFailure](state, payload){
        state.isSubmitting = true,
        state.validationErrors = payload
    }
}

const actions = {
    createArticle(context,{articleInput}){
        return new Promise(resolve => {
            context.commit(mutationsTypes.createArticleStart)
            articleaApi.createArticle(articleInput).then(article => {
                context.commit(mutationsTypes.createArticleSuccess)
                resolve(article)
            }).catch(result => {
                context.commit( mutationsTypes.createArticleFailure, result.response.data.errors)
            })
        })
    }
}

export default{
    state,
    mutations,
    actions
}