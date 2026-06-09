import { cn } from "@/shared/lib"
import { type FC } from "react"

type Props = {
  children: React.ReactNode
  className?: string
  isCustom?: boolean
}

interface WrapperComponent extends FC<Props> {
  Header: FC<Props>
  Content: FC<Props>
}

export const PageWrapper: WrapperComponent = ({ children, className }) => {
  return (
    <section
      className={cn(
        className,
        "flex flex-col gap-4 flex-1 w-full h-full no-scrollbar max-w-[1024px] mx-auto",
      )}
    >
      {children}
    </section>
  )
}

PageWrapper.Header = ({ children, className, isCustom }) => {
  return (
    <header className={cn(!isCustom && "pb-2", className)}>{children}</header>
  )
}

PageWrapper.Content = ({ children, className, isCustom }) => {
  return (
    <main
      className={cn(
        !isCustom && "no-scrollbar pt-2 overflow-y-auto",
        className,
      )}
    >
      {children}
    </main>
  )
}
