import 'vue-jest-extended'

export const twPluginMock = {
  colors: new Proxy(
    {},
    {
      get: () => ({})
    }
  )
}
