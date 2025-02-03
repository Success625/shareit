"use server"

import { ZodError } from "zod"
import { stateProps } from "@/components/SignUpForm";
import { signinStateProps } from "@/components/SignInForm";
import { signinUserSchema, userSchema } from "./zod";
import { passwordHash } from "./bcrypt";
import db from "./db";
import { signinUser } from "./utils";

export async function signUpUser(prevState: any, formData: FormData): Promise<stateProps> {
  const firstname = formData.get("firstname")?.toString().trim() || '';
  const lastname = formData.get("lastname")?.toString().trim() || '';
  const email = formData.get("email")?.toString().trim() || '';
  const password = formData.get("password")?.toString().trim() || '';
  const passwordConfirm = formData.get("passwordConfirm")?.toString().trim() || '';

  const formValues = { firstname, lastname, email, password, passwordConfirm }

  const newState: stateProps = {
    success: false,
    values: {
      firstname,
      lastname,
      email,
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
        data: { firstname, lastname, email, hashedPassword }
      }).then(async () => {
        await signinUser(email, password, newState)
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
  const email = formData.get("email")?.toString().trim() || '';
  const password = formData.get("password")?.toString().trim() || '';

  const formValues = { email: email, password }

  const newState: signinStateProps = {
    success: false,
    values: {
      email: email,
      password,
    },
    errors: {}
  }

  try {
    await signinUserSchema.parseAsync(formValues)
    await signinUser(email, password, newState)
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.flatten().fieldErrors
      newState.errors = errors;
    }

    console.error("Unexpected error:", error)
  }

  return newState;
}

