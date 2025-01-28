"use client"

import React, { useActionState } from 'react'
import { Input } from './ui/input'
import Button from './Button'
import { signUpUser } from '@/lib/actions'
import ErrorMsg from './ErrorMsg'
import { redirect } from 'next/navigation'

export interface stateProps {
  success: boolean | null;
  values: {
    firstname: string,
    lastname: string,
    emailAddress: string,
    password: string,
    passwordConfirm: string,
  };
  errors: Record<string, string[] | undefined>
}

const SignUpForm = () => {
  const [state, action, isPending] = useActionState<stateProps>(signUpUser, {
    success: null,
    values: {
      firstname: "",
      lastname: "",
      emailAddress: "",
      password: "",
      passwordConfirm: ""
    },
    errors: {}
  })

  if (state.success) {
    redirect('/')
  }

  return (
    <form action={action} className='sign-form'>
      <div className='flex items-center gap-3'>
        <div className="form_control-group group">
          <label
            htmlFor="firstname"
            className="form_control-label"
          >
            First Name
          </label>
          <Input
            id="firstname"
            className="form_control-input"
            type="text"
            name="firstname"
            required
            defaultValue={state.values.firstname}
          />
        </div>
        <div className="form_control-group group">
          <label
            htmlFor="lastname"
            className="form_control-label"
          >
            Last Name
          </label>
          <Input
            id="lastname"
            className="form_control-input"
            type="text"
            name="lastname"
            required
            defaultValue={state.values.lastname}
          />
        </div>
      </div>
      {state.errors?.firstname ? (
        <ErrorMsg errArr={state.errors?.firstname} />
      ) : (
        <ErrorMsg errArr={state.errors?.lastname} />
      )
      }

      <div className="form_control-group group">
        <label
          htmlFor="emailAddress"
          className="form_control-label"
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
          className="form_control-label"
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

      <div className="form_control-group group">
        <label
          htmlFor="passwordConfirm"
          className="form_control-label"
        >
          Password Confirm
        </label>
        <Input
          id="passwordConfirm"
          className="form_control-input"
          type="password"
          name="passwordConfirm"
          required
          defaultValue={state.values.passwordConfirm}
        />
      </div>
      <ErrorMsg errArr={state.errors?.passwordConfirm} />

      <Button type='submit' className='form_control-btn' disabled={isPending}>{isPending ? "Submitting..." : "Submit"}</Button>
    </form>
  )
}

export default SignUpForm
