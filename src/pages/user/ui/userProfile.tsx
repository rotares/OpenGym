import { useUser } from "@/entities/user"
import { PageWrapper } from "@/shared/ui/components"
import { Avatar, AvatarFallback } from "@/shared/ui/primitives"
import { WorkoutStats } from "@/widgets/workout-stats"
export const UserProfilePage = () => {
  const { data: user } = useUser()

  return (
    <PageWrapper className="overflow-auto">
      <PageWrapper.Header>
        <h1 className="text-xl">Профиль</h1>
      </PageWrapper.Header>
      <PageWrapper.Content isCustom={true} className="flex flex-col gap-8">
        <div className=" bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4 p-4">
            <Avatar className="size-12 md:size-15 shrink-0 rounded-lg">
              <AvatarFallback className="text-2xl">
                {user.username.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-l" data-testid="username">
                {user.username}
              </div>
              <div className="text-xs text-slate-400">
                Дата регистрации: {user.regDate}
              </div>
            </div>
          </div>
        </div>
        <WorkoutStats />
      </PageWrapper.Content>
    </PageWrapper>
  )
}
