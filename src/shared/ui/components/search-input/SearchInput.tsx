import { Input } from "@/shared/ui/primitives"

type Props = {
  onChange: (value: string) => void
  value: string
  placeholder?: string
  type?: string
}

export const SearchInput = ({
  onChange,
  value,
  placeholder,
  type = "text",
}: Props) => {
  return (
    <>
      <Input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </>
  )
}
