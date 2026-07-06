export interface RouteMeta {
  title: string
  breadcrumb: string[]
}

export const routeMeta: Record<string, RouteMeta> = {
  '/': {
    title: 'Dashboards',
    breadcrumb: ['Reportes', 'Dashboards'],
  },
  '/sensibilidad': {
    title: 'Sensibilidad acumulada',
    breadcrumb: ['Reportes', 'Dashboards', 'Sensibilidad acumulada'],
  },
  '/mecanismos': {
    title: 'Mecanismos de resistencia',
    breadcrumb: ['Reportes', 'Dashboards', 'Mecanismos de resistencia'],
  },
  '/tendencia-mdro': {
    title: 'Tendencia de gérmenes resistentes',
    breadcrumb: ['Reportes', 'Dashboards', 'Tendencia MDRO'],
  },
  '/virus-respiratorios': {
    title: 'Virus respiratorios',
    breadcrumb: ['Reportes', 'Dashboards', 'Virus respiratorios'],
  },
}

export function getRouteMeta(pathname: string): RouteMeta {
  const hash = pathname.replace(/^#/, '')
  return routeMeta[hash] ?? routeMeta['/']
}
