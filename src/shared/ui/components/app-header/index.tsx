import { useHeaderStore } from "@/shared/store/header"

//global header
export const AppHeader = () => {
  const headerConfig = useHeaderStore((store) => store.headerConfig)

  const renderActions = () => {
    if (!headerConfig?.actions) return null

    return typeof headerConfig.actions === "function"
      ? headerConfig.actions()
      : headerConfig?.actions
  }

  return (
    <header className="bg-primary text-white p-4">
      <div className="flex gap-3 items-center justify-between  max-w-[1440px] mx-auto w-full">
        <h1>OpenGym</h1>
        <div>{renderActions()}</div>
      </div>
    </header>
  )
}
