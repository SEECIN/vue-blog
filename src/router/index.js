import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Article from '../views/Article'
import User from '../views/User'
import ArticleList from '../views/ArticleList'
import Column from '../views/Column'
import Editor from '../views/Editor'
import Socket from '../views/Socket'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import MHome from '../mviews/MHome'
import MArticleList from '../mviews/ArticleList'
import MArticle from '../mviews/Article'
import MColumn from '../mviews/Column'
import MUser from '../mviews/User'

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (local) {
  return originalReplace.call(this, local).catch(err => err)
}

VueRouter.prototype.push = function (local) {
  return originalPush.call(this, local).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/index',
    component: Home,
    children: [
      {
        path: '/column',
        component: Column,
        name: "column"
      },
      {
        path: '/article/:id',
        component: Article,
        name: "article"
      },
      {
        path: '/index',
        component: ArticleList,
        name: "index"
      },
      {
        path: '/editor',
        name: 'editor',
        component: Editor,
        props: (route) => ({
          columnId: route.query.columnId
        })
      },
      {
        path: '/user',
        component: User,
        name: "user"
      },
      {
        path: '/chat',
        component: Socket,
        name: 'chat'
      }
    ]
  },
  {
    path: '/m',
    name: 'mHome',
    redirect: '/m/articles',
    component: MHome,
    children: [
      {
        path: 'articles',
        name: 'mArticleList',
        component: MArticleList,
        meta: {
          headType: 'SearchBar',
          useBaseFoot: true,
          active: 'MArticleList'
        }
      },
      {
        path: 'article',
        name: 'mArticle',
        component: MArticle,
        meta: {
          headType: 'ArticleBar',
          useBaseFoot: false

        }
      },
      {
        path: 'column',
        name: 'mColumn',
        component: MColumn,
        meta: {
          headType: 'NavBar',
          useBaseFoot: true,
          title: '分类',
          active: 'MColumn'
        }
      },
      {
        path: 'user',
        name: 'mUser',
        component: MUser,
        meta: {
          headType: 'NavBar',
          useBaseFoot: true,
          title: '我的',
          active: 'MUser'
        }
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  // let useAuth = to.meta.requiresAuth
  // if (useAuth && !store.state.token) {
  //   Vue.prototype.$notify.warning({
  //     title: '通知',
  //     message: `请先登录`
  //   })
  //   NProgress.done()
  //   next('/index')
  // }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
