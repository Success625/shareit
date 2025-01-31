import { signIn } from "@/auth";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function signinUser(emailAddress: string, password: string, state?: any) {
  const signinFormData = new FormData();
  signinFormData.append("emailAddress", emailAddress);
  signinFormData.append("password", password);

  await signIn('credentials', signinFormData).catch(error => {
    console.error("Sign in failed!", error);
  }).then(() => {
    state!.success = true;
  })

}
