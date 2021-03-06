import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/book',
    component: Layout,
    meta: { title: '图书管理', icon: 'documentation' },
    children: [
      {
        name: 'bookCreate',
        path: '/book/create',
        component: () => import('@/views/book/create'),
        meta: {
          title: '上传图书',
          icon: 'documentation',
          roles: ['admin', ['editor']]
        }
      },
      {
        name: 'bookEdit',
        path: '/book/edit/:fileName',
        hidden: true,
        component: () => import('@/views/book/edit'),
        meta: {
          title: '编辑图书',
          icon: 'edit',
          roles: ['admin'],
          activeMenu: '/book/list'
        }
      },
      {
        name: 'bookList',
        path: '/book/list',
        component: () => import('@/views/book/create'),
        meta: {
          title: '图书列表',
          icon: 'edit',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/three',
    component: Layout,
    meta: { title: 'ThreeJS', icon: 'documentation' },
    children: [
      {
        name: 'three',
        path: '/three/subject',
        component: () => import('@/views/three/index'),
        meta: {
          title: '3D',
          icon: 'documentation',
          roles: ['admin', ['editor']]
        }
      }
    ]
  },
  {
    path: '/list',
    component: Layout,
    meta: { title: 'Nested Routes', icon: 'nested' },
    redirect: '/list/index',
    name: '零级',
    children: [
      {
        name: '一级1',
        path: 'index',
        component: () => import('@/views/list/index'),
        meta: {
          title: 'level1',
          icon: 'edit',
        }
      },
      {
        name: 'level2',
        path: 'level2',
        component: () => import('@/views/list/level2'),
        meta: {
          title: '1级2',
          icon: 'edit',
        },
        children: [
          {
            path: 'menu1-2-1',
            component: () => import('@/views/list/level2-1'),
            name: 'Menu1-2-1',
            meta: { title: 'Menu 1-2-1' }
          },
          {
            path: 'menu1-2-2',
            component: () => import('@/views/list/level2-2'),
            name: 'Menu1-2-2',
            meta: { title: 'Menu 1-2-2' }
          }
        ]
      },
    ]
  },
  {
    path: '/table',
    component: Layout,
    meta: { title: 'Table', icon: 'documentation' },
    children: [
      {
        name: 'table',
        path: '/table/index',
        component: () => import('@/views/table/index'),
        meta: {
          title: 'Table',
          icon: 'documentation',
          roles: ['admin', ['editor']]
        }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
