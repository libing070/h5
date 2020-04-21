import Vue from 'vue'
import Router from 'vue-router'
import i18n from '@/lang'
import {
  Message
} from 'element-ui';
const SignIn = resolve => require(['@/components/Home'], resolve)
const Layout = resolve => require(['@/components/common/Layout'], resolve)
const Dimensions = resolve => require(['@/components/Dimensions'], resolve)
const Case = resolve => require(['@/components/Dimensions/case'], resolve)
const Galaxy = resolve => require(['@/components/Galaxy'], resolve)
const Account = resolve => require(['@/components/Account'], resolve)
const NotFound = resolve => require(['@/components/404'], resolve)

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/sign-in',
      component: SignIn,
      meta: {
        permission: false
      }
    }, {
      path: '/',
      component: Layout,
      meta: {
        permission: true
      },
      redirect: '/dimensions',
      children: [{
        path: '/dimensions',
        component: Dimensions,
        meta: {
          permission: true
        },
      }, {
        path: '/case',
        component: Case,
        meta: {
          permission: true
        },
      }, {
        path: '/galaxy',
        component: Galaxy,
        meta: {
          permission: true
        },
      }, {
        path: '/account',
        component: Account,
        meta: {
          permission: true
        },
      }]
    }, {
      path: '*',
      component: NotFound,
      meta: {
        permission: false
      }
    }

  ]
})

router.beforeEach((to, from, next) => {
    // 如果已经登录了
  if (localStorage.hasLogin && JSON.parse(localStorage.hasLogin)) {
    // 如果要去账户管理页面
    if (to.path === '/account') {
      // 如果是超级管理员
      if (JSON.parse(localStorage.isSuperAdmin)) {
        next()
      } else {
        // 否则就返回并提示没有权限
        next(from.path)
        Message.warning(i18n.t('m.global.tips[0]'))
      }
    } else {
      next()
    }
    // 如果没有正常登录，并且需要权限验证，就导航到登录页
  } else if (to.meta.permission) {
    localStorage.hasLogin = false
    router.push('/sign-in')
    Message.warning(i18n.t('m.login.info'))
  } else {
    // 否则，没有登录，不需要权限验证，就放行通过
    next()
  }
})

export default router
