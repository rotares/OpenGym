import { format } from "date-fns";
import { ru } from 'date-fns/locale';
import type { PeriodRange } from "../model";

export const formatPeriodLabel = (range: PeriodRange, start: Date | null, end: Date | null) => {
  if (range === "all") return "Все время"
  if (!start || !end) return ""

  switch (range) {
    case "week":
      return `${format(start, "MMM dd", {locale: ru})} - ${format(end, "MMM dd", {locale: ru})}`

    case "month":
      return format(start, "LLLL yyyy", {locale: ru})

    case "year":
      return format(start, "yyyy", {locale: ru})

    default:
      return ""
  }
}