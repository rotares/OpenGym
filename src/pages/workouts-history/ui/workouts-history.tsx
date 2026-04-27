import { useHeaderStore } from "@/shared/store/header"
import { Button } from "@/shared/ui/primitives"
import { useEffect } from "react"

export const WorkoutsHistoryPage = () => {
  const setHeaderConfig = useHeaderStore((state) => state.setHeaderConfig)

  //set header config for page
  useEffect(() => {
    setHeaderConfig({
      actions: () => (
        <Button onClick={() => alert("add workout")}>Add workout</Button>
      ),
    })

    return () => setHeaderConfig(null)
  }, [setHeaderConfig])

  return (
    <>
      <div>workouts</div>
    </>
  )
}
