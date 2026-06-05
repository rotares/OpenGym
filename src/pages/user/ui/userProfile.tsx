import { useUser } from "@/entities/user"
import { PageWrapper } from "@/shared/ui/components"

export const UserProfilePage = () => {
  const { data: user } = useUser()

  return (
    <PageWrapper>
      <PageWrapper.Header>
        <div>Профиль</div>
      </PageWrapper.Header>
      <PageWrapper.Content>{user.username}</PageWrapper.Content>
    </PageWrapper>
  )
}
