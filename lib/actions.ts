"use server"

import { ZodError } from "zod"
import { stateProps } from "@/components/SignUpForm";
import { signinStateProps } from "@/components/SignInForm";
import { signinUserSchema, userSchema } from "./zod";
import { signIn } from "@/auth";
import { passwordHash } from "./bcrypt";
import db from "./db";
import { signinUser } from "./utils";

export async function signUpUser(prevState: any, formData: FormData): Promise<stateProps> {
  const firstname = formData.get("firstname")?.toString().trim() || '';
  const lastname = formData.get("lastname")?.toString().trim() || '';
  const emailAddress = formData.get("emailAddress")?.toString().trim() || '';
  const password = formData.get("password")?.toString().trim() || '';
  const passwordConfirm = formData.get("passwordConfirm")?.toString().trim() || '';

  const formValues = { firstname, lastname, emailAddress, password, passwordConfirm }

  const newState: stateProps = {
    success: false,
    values: {
      firstname,
      lastname,
      emailAddress,
      password,
      passwordConfirm
    },
    errors: {}
  }

  try {
    await userSchema.parseAsync(formValues);
    const hashedPassword = await passwordHash(password).catch(err => {
      console.error("Password hashing failed!", err)
    }) as string;

    try {
      await db.user.create({
        data: { firstname, lastname, emailAddress, hashedPassword }
      }).then(async () => {
        await signinUser(emailAddress, password, newState)
      })
    } catch (error) {
      console.error("Database error:", error)
      throw error
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.flatten().fieldErrors
      newState.errors = errors;
    }

    console.error("Unexpected error:", error)
  }

  return newState;
}

export async function signInUser(prevState: signinStateProps, formData: FormData): Promise<signinStateProps> {
  const emailAddress = formData.get("emailAddress")?.toString().trim() || '';
  const password = formData.get("password")?.toString().trim() || '';

  const formValues = { emailAddress, password }

  const newState: signinStateProps = {
    success: false,
    values: {
      emailAddress,
      password,
    },
    errors: {}
  }

  try {
    await signinUserSchema.parseAsync(formValues)
    await signinUser(emailAddress, password, newState)
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.flatten().fieldErrors
      newState.errors = errors;
    }

    console.error("Unexpected error:", error)
  }

  return newState;
}

