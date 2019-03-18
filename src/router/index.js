import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import CreateNewUser from '@/components/CreateNewUser'
import ListUserInfo from '@/components/ListUserInfo'
import ModifyUserInfo from '@/components/ModifyUserInfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }, {
      path: '/CreateNewUser',
      name: 'CreateNewUser',
      component: CreateNewUser
    }, {
      path: '/ListUserInfo',
      name: 'ListUserInfo',
      component: ListUserInfo
    }, {
      path: '/ModifyUserInfo',
      name: 'ModifyUserInfo',
      component: ModifyUserInfo
    },{
      path:'/CreateInvigilation',
      name:'CreateInvigilation',
      component: () => import('@/components/CreateInvigilation.vue')
    },{
      path:'/ListInvigilationInfo',
      name:'ListInvigilationInfo',
      component: () => import('@/components/ListInvigilationInfo.vue')
    },{
      path:'/ModifyInvigilation',
      name:'ModifyInvigilation',
      component: () => import('@/components/ModifyInvigilation.vue')
    },{
      path:'/ListInvigilationPersonInfo',
      name:'ListInvigilationPersonInfo',
      component: () => import('@/components/ListInvigilationPersonInfo.vue')
    }
  ]
})
