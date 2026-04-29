import { RiArrowLeftLine } from "@remixicon/react"
import { useNavigate } from "react-router"
import { Button } from "../../primitives"

export const BackButton = () => {
  const navigate = useNavigate()
  const handleClick = () => navigate(-1)

  return (
    <Button onClick={handleClick} variant={"outline"} size={"icon"}>
      <RiArrowLeftLine />
    </Button>
  )
}
