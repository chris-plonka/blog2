'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from './ui/button'

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      }}
      aria-label='Toggle theme'
    >
      <SunIcon className='size-5 dark:block' />
      <MoonIcon className='size-5 dark:hidden' />
    </Button>
  )
}

export default ThemeToggle