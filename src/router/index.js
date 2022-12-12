import Vue from 'vue'
import VueRouter from 'vue-router'
import GlobalFeed from '../views/GlobalFeed'
import YourFeed from '../views/YourFeed'
import TagFeed from '../views/TagFeed'
import Register from '../views/Register'
import Login from '../views/Login'
import Article from '../views/Article'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'globalfeed',
    component: GlobalFeed
  },
  {
    path: '/feed',
    name: 'yourfeed',
    component: YourFeed
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: TagFeed
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: Article
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: Article
  },
  {
    path: '/articles/:slug',
    name: 'editArticle',
    component: Login
  },
  {
    path: '/settings',
    name: 'settings',
    component: Login
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: Login
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
