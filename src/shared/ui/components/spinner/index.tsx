import { cn } from "@/shared/lib/utils"
import { Spinner } from "@/shared/ui/primitives"

type Props = {
  className?: string
  children?: React.ReactNode
}

export const CustomSpinner = ({ className, children }: Props) => {
  return (
    <div
      data-testid="spinner"
      className={cn(
        "flex-1 flex items-center justify-center ",
        className,
        children && "flex-col gap-4",
      )}
    >
      <Spinner className="size-10" />
      {children && <div>{children}</div>}
    </div>
  )
}
