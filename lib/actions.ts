"use server"

import { ZodError } from "zod"
import { stateProps } from "@/components/SignUpForm";
import { signinStateProps } from "@/components/SignInForm";
import { signinUserSchema, userSchema } from "./zod";
import { signIn } from "@/auth";
import { passwordHash } from "./bcrypt";
import db from "./db";

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
    await userSchema.parseAsync(formValues)
    const hashedPassword = await passwordHash(password).catch(err => {
      console.error("Password hashing failed!", err)
      throw err
    })

    try {
      await db.user.create({
        data: { firstname, lastname, emailAddress, hashedPassword }
      }).then(async () => {
        const signinFormData = new FormData();
        signinFormData.append("emailAddress", emailAddress);
        signinFormData.append("password", password);

        await signIn('credentials', signinFormData).catch(error => {
          console.error("Sign in failed!", error);
          throw error
        })

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
    throw error
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
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.flatten().fieldErrors
      newState.errors = errors;
    }

    console.log("Unexpected error:", error)
  }

  return newState;
}

