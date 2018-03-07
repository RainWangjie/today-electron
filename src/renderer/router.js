import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/welcome',
      component: require('./views/ConfigView').default
    },
    {
      path: '/',
      component: require('./views/LandingView').default
    },
    {
      path: '/main',
      component: require('./views/MainView').default,
      children: [
        {
          path: '',
          name: 'main',
          component: require('./views/BlankView').default
        },
        {
          path: ':listItemUUID',
          component: require('./views/TodoItemView').default,
          children: [
            {
              path: ':todoItemUUID',
              component: require('./views/DetailView').default
            }
          ]
        },
        {
          path: 'today',
          component: require('./views/TodoItemView').default,
          children: [
            {
              path: ':todoItemUUID',
              component: require('./views/DetailView').default
            }
          ]
        }
      ]
    },
    {
      path: '/summary',
      component: require('./views/SummaryView').default
    },
    {
      path: '/settings',
      component: require('./views/SettingsView').default
    }
  ]
})
