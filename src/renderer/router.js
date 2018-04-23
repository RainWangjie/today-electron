import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/welcome',
      component: require('./pages/config').default
    },
    {
      path: '/',
      component: require('./pages/landing').default
    },
    {
      path: '/main',
      component: require('./pages/main').default,
      children: [
        {
          path: '',
          name: 'main',
          component: require('./pages/blank').default
        },
        {
          path: ':listItemUUID',
          component: require('./components/todo-list').default,
          children: [
            {
              path: ':todoItemUUID',
              component: require('./pages/detail').default
            }
          ]
        },
        {
          path: 'today',
          component: require('./components/todo-list').default,
          children: [
            {
              path: ':todoItemUUID',
              component: require('./pages/detail').default
            }
          ]
        }
      ]
    },
    {
      path: '/summary',
      component: require('./pages/summary').default
    },
    {
      path: '/settings',
      component: require('./pages/settings').default
    }
  ]
})
