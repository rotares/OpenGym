import { useUser } from "@/entities/user/model/useUser"
import { CustomSpinner } from "@/shared/ui/components"

export const UserProfilePage = () => {
  const { data: user } = useUser()

  if (!user) {
    return <CustomSpinner />
  }

  return (
    <section className="flex flex-1">
      <div>{user.username}</div>
    </section>
  )
}
