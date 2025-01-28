import React from 'react'

const ErrorMsg = ({ errArr }: { errArr: string[] | undefined }) => {
  return (
    errArr && (
      <p className='relative -mt-6 mb-4 text-sm text-red-500'>{errArr[0]}</p>
    )
  )
}

export default ErrorMsg
