export interface HeaderConfig {
  title?: string
  actions?: React.ReactNode
}

export interface PageHeaderConfig extends HeaderConfig {
  back?: boolean
}

export interface RouteHandle {
  header?: HeaderConfig,
  pageHeader?: PageHeaderConfig
}