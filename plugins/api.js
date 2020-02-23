import Vue from 'vue'
import people from '~/static/users.json'

export default function({ app, $axios, store }) {
  const $api = {
    fetchUsers() {
      return people
    }
  }

  Vue.prototype.$api = $api
  store.$api = $api
  app.$api = $api
}
