import { useUser } from "@/entities/user"

export const UserProfilePage = () => {
  const { data: user } = useUser()

  return (
    <section className="flex flex-1">
      <div>{user.username}</div>
    </section>
  )
}
