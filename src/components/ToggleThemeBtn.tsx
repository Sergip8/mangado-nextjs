"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  function handleTheme() {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    localStorage.setItem('theme', resolvedTheme === 'dark' ? 'light' : 'dark')
    
  }

  useEffect(() =>  setMounted(true), [])
  console.log(resolvedTheme)
  return (
    <Image
      src={resolvedTheme === 'light' ? '/icon-moon.svg' : '/icon-sun.svg'}
      width={36}
      height={36}
      sizes="36x36"
      alt="Loading Light/Dark Toggle"
      priority={false}
      title="Loading Light/Dark Toggle"
      onClick={() => handleTheme()}
    />
  )


}