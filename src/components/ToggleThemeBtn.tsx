"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"

export default function ThemeSwitch() {
  const [image, setImage] = useState( '/icon-sun.svg' || '/icon-moon.svg')
  const { setTheme, resolvedTheme } = useTheme()

  function handleTheme() {
    setImage(resolvedTheme === 'dark' ? '/icon-moon.svg' : '/icon-sun.svg')
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    localStorage.setItem('theme', resolvedTheme === 'dark' ? 'light' : 'dark')
    
  }

  
  console.log(resolvedTheme)
  return (
    <Image
      src={image}
      width={30}
      height={30}
      sizes="36x36"
      alt="Loading Light/Dark Toggle"
      priority={false}
      title="Loading Light/Dark Toggle"
      onClick={() => handleTheme()}
    />
  )


}