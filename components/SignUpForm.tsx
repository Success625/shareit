import React from 'react'
import { Input } from './ui/input'
import Button from './Button'

const SignUpForm = () => {
  return (
    <form className='sign-form'>
      <div className='max-w-11/12 w-11/12 flex gap-2'>
        <Input className='form-input' placeholder='First Name' type='text' />
        <Input className='form-input' placeholder='Last Name' type='text' />
      </div>
      <Input className='form-input' placeholder='Email address' type='text' />
      <Input className='form-input' placeholder='Password' type='password' />
      <Button type='submit' className='form-input_btn'>Submit</Button>
    </form>
  )
}

export default SignUpForm
