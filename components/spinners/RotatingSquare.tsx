import React from 'react'
import { FadeLoader } from 'react-spinners'

const FadeLoaderSpinner = () => (
  <div className='fixed inset-0 flex items-center justify-center z-10'>
    <FadeLoader width={5} height={15} radius={2} color='#09e1ff' />
  </div>
)

export default FadeLoaderSpinner
