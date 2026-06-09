import { type LucideIcon } from "lucide-react"

type Props = {
  icon: LucideIcon
  title: string
  value: number | string
  colorClass: string
}

export const StatCard = ({ icon: Icon, title, value, colorClass }: Props) => (
  <div
    className={`flex items-center gap-3 p-2 rounded-xl border border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 shadow-sm ${colorClass}`}
  >
    <div className="p-2.5 rounded-lg bg-current/10">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
        {title}
      </p>
      <p className="text-md  mt-0.5">{value}</p>
    </div>
  </div>
)
