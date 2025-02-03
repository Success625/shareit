"use client"

import React from 'react'
import Button from './Button'
import { TypeAnimation } from "react-type-animation"

const Hero = () => {
  return (
    <div className='hero'>
      <h3 className='font-geist text-5xl font-extrabold text-white mt-2 mb-4'>
        Shareit
      </h3>
      <TypeAnimation
        preRenderFirstString={true}
        sequence={[
          500,
          'Share Every Moment', // initially rendered starting point
          1000,
          'Share Every Laughter',
          1000,
          'Share Every Smile',
          1000,
          'Shareit',
          500,
        ]}
        wrapper='div'
        speed={50}
        repeat={Infinity}
        className='inline-block text-2xl bg-gray-900 p-2 rounded-sm text-white mb-3'
      />
      <Button className='big-btn'>Start Sharing</Button>
    </div>
  )
}

export default Hero
