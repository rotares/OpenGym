export interface HeaderConfig {
  title?: string
  actions?: React.ReactNode
}

export interface PageHeaderConfig extends HeaderConfig {
  back?: boolean
}
