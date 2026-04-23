import { useHeaderContext } from "@/shared/context/header-config-context"
import { useEffect } from "react"

export const WorkoutsHistoryPage = () => {
  const { setHeaderConfig } = useHeaderContext()

  //конфиг для PageLayout
  useEffect(() => {
    setHeaderConfig({
      title: "История тренировок",
    })

    // Очищайте при размонтировании
    return () => setHeaderConfig(null)
  }, [setHeaderConfig])

  return (
    <>
      <div>workouts</div>
    </>
  )
}
