import { SignInForm, SignUpForm } from "@/features/auth"
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
          <TabsTrigger
            data-testid="signInTab"
            value="sign-in"
            children={"Sign In"}
          />
          <TabsTrigger
            data-testid="signUpTab"
            value="sign-up"
            children={"Sign Up"}
          />
        </TabsList>

        <TabsContent value="sign-in" children={<SignInForm />} />
        <TabsContent value="sign-up" children={<SignUpForm />} />
      </Tabs>
    </div>
  )
}
