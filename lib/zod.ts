import { z } from "zod";
import db from "./db";
import bcrypt from "bcryptjs"

export const userSchema = z.object({
  firstname: z.string().min(1, "First name is required!").min(3, "Firstname must be at least three characters!").regex(new RegExp(/^[a-zA-Z]+$/), "First name can only contain valid string characters!"),
  lastname: z.string().min(1, "Last name is required!").min(3, "Lastname must be at least three characters!").regex(new RegExp(/^[a-zA-Z]+$/), "Last name can only contain valid string characters!"),
  email: z.string().min(1, "Email address is required!").email("Email address must be valid!"),
  password: z.string().min(1, "Password is required!").min(4, "Password must be at least 4 characters!"),
  passwordConfirm: z.string().min(1, "Password confirmation is required!")
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords do not match!",
  path: ["passwordConfirm"]
}).superRefine(async (data, ctx) => {
  const user = await db.user.findFirst({
    where: { email: data.email },
  })

  if (user) {
    ctx.addIssue({
      path: ['email'],
      message: "Email address already exist exist!",
      code: "custom"
    })
    return
  }
})

export const signinUserSchema = z.object({
  email: z.string().min(1, 'Email address is required!'),
  password: z.string().min(1, "Password is required")
}).superRefine(async (data, ctx) => {
  const user = await db.user.findFirst({
    where: { email: data.email },
  })

  if (!user) {
    ctx.addIssue({
      path: ['email'],
      message: "Email address does not exist!",
      code: "custom"
    })
    return
  }

  const isPasswordCorrect = await bcrypt.compare(data.password, user.hashedPassword)
  if (!isPasswordCorrect) {
    ctx.addIssue({
      path: ['password'],
      message: 'Password is incorrect',
      code: "custom"
    })
  }
})
