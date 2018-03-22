import routerBuilder from '@/lib/routerBuilder'

const routerConfig = {
  routes: [
    {
      name: 'Landing',
      path: '/'
    },
    'reportBuilder'
  ]
}

export default routerBuilder(routerConfig)
