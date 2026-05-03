import { SignInForm, SignUpForm } from "@/features/auth-form"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui/primitives"

export const AuthModal = () => {
  return (
    <div className="m-auto">
      <Tabs defaultValue="sign-in" className="gap-5">
        <TabsList variant={"line"} className="flex self-center">
          <TabsTrigger value="sign-in" children={"SignIn"} />
          <TabsTrigger value="sign-up" children={"SignUp"} />
        </TabsList>
        <TabsContent value="sign-in" children={<SignInForm />} />
        <TabsContent value="sign-up" children={<SignUpForm />} />
      </Tabs>
    </div>
  )
}
