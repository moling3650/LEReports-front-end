import routerBuilder from '@/lib/routerBuilder'

const routerConfig = {
  routes: [
    {
      name: 'Landing',
      path: '/'
    },
    'ReportBuilder'
  ]
}

export default routerBuilder(routerConfig)
