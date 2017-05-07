import Vue from 'vue'
import Router from 'vue-router'
import venues from '@/views/venues'
import venue from '@/views/venue'
import door from '@/views/door'
import addVenue from '@/views/addVenue'
import holder from '@/views/holder'
Vue.use(Router)

export default new Router({
  routes: [

    // 内容管理
    {
      path: '/venues',
      component: venues,
      children: [{
        path: '/venue',
        component: venue
      }, {
        path: '/door',
        component: door
      }, {
        path: '/addVenue',
        component: addVenue
      }]
    }, {
      path: '/holder',
      component: holder,
    }

  ]
})