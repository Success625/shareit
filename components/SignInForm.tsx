"use client"

import React, { useActionState } from "react";
import { Input } from "./ui/input";
import Button from "./Button";
import ErrorMsg from "./ErrorMsg";
import { signInUser } from "@/lib/actions";

export interface signinStateProps {
  success: boolean | null;
  values: {
    emailAddress: string,
    password: string,
  };
  errors: Record<string, string[] | undefined>
}

const SignInForm = () => {
  const [state, action, isPending] = useActionState(signInUser, {
    success: null,
    values: {
      emailAddress: "",
      password: "",
    },
    errors: {}
  })

  return (
    <form action={action} className="sign-form">
      <div className="form_control-group group">
        <label
          htmlFor="emailAddress"
          className="form_control-label group-has-[:focus]:top-0 group-has-[:valid]:top-0"
        >
          Email Address
        </label>
        <Input
          id="emailAddress"
          className="form_control-input"
          type="text"
          name="emailAddress"
          required
          defaultValue={state.values.emailAddress}
        />
      </div>
      <ErrorMsg errArr={state.errors?.emailAddress} />

      <div className="form_control-group group">
        <label
          htmlFor="password"
          className="form_control-label group-has-[:focus]:top-0 group-has-[:valid]:top-0"
        >
          Password
        </label>
        <Input
          id="password"
          className="form_control-input"
          type="password"
          name="password"
          required
          defaultValue={state.values.password}
        />
      </div>
      <ErrorMsg errArr={state.errors?.password} />

      <Button type="submit" className="form_control-btn" disabled={isPending}>
        Submit
      </Button>
    </form>
  );
};

export default SignInForm;
