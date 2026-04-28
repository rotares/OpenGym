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
    <header className="bg-primary text-primary-foreground flex items-center px-4 py-3">
      <div className="flex gap-3 items-center justify-between max-w-[1440px] h-[35px]  mx-auto w-full">
        <h1 className="text-xl ">OpenGym</h1>
       {renderActions()}
      </div>
    </header>
  )
}
