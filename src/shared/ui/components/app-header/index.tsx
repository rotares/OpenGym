//global header
export const AppHeader = ({ actions, headerConfig }) => {
  console.log("пропы app header", actions, headerConfig)

  return (
    <header className="bg-primary text-primary-foreground flex items-center px-4 py-3">
      <div className="flex gap-3 items-center justify-between @md:max-w-250 h-[35px]  mx-auto w-full">
        <h1 className="text-xl ">OpenGym</h1>
        {actions && <div>{actions}</div>}
      </div>
    </header>
  )
}
