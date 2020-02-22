import Vue from 'vue'
import parse from 'parse-link-header'

export default function({ app, $axios, store }) {
  const $api = {
    async fetchUsers() {
      const users = []

      let page = await $axios.get(
        'https://api.github.com/repositories/11730342/contributors',
        {
          params: {
            per_page: 100,
            page: 1
          }
        }
      )
      users.push(...page.data)
      let parsed = parse(page.headers.link)

      while (parsed.next) {
        page = await $axios.get(parsed.next.url)
        users.push(...page.data)
        parsed = parse(page.headers.link)
      }
      return users
    }
  }

  Vue.prototype.$api = $api
  store.$api = $api
  app.$api = $api
}
