import { type LucideIcon } from "lucide-react"

export type ItemType = {
  label: string
  name: string
  route: string
  icon?: LucideIcon
}

export interface NavigationConfig {
  string: ItemType[]
}

export type NavProps = {
  items: ItemType[]
}
