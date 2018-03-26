import routerBuilder from '@/lib/routerBuilder'

const routerConfig = {
  routes: [
    {
      name: 'Landing',
      path: '/'
    },
    'ReportBuilder',
    'ReportQuerier'
  ]
}

export default routerBuilder(routerConfig)
