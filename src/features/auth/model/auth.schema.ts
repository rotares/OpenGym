import * as z from "zod"

//register
export type FormRegisterSchemaInput = z.input<typeof formRegisterSchema>
export type FormRegisterSchemaOutput = z.output<typeof formRegisterSchema>

export const formRegisterSchema = z
  .object({
    email: z.email("Wrong type of email"),
    username: z.string().min(6, { error: "Minimum length is 6 symobls" }),
    password: z
      .string("Password is required")
      .min(6, "Minimum length is 6 symobls"),
    confirmPassword: z.string().min(1, { error: "Password can't be a empty" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords aren't equal",
    path: ["confirmPassword"],
  })

//login

export type FormLoginSchemaInput = z.input<typeof formLoginSchema>
export type FormLoginSchemaOutput = z.output<typeof formLoginSchema>

export const formLoginSchema = z.object({
  email: z.email("Wrong type of email"),
  password: z.string().min(1, "Enter the password"),
})
