import routerBuilder from '@/lib/routerBuilder'

const routerConfig = {
  routes: [
    {
      path: '/',
      redirect: '/ReportBuilder'
    },
    'ReportBuilder',
    'ReportQuerier'
  ]
}

export default routerBuilder(routerConfig)
