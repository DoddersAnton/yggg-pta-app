import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { Button } from '../ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const ThemeToggle = () => {
    const { setTheme } = useTheme()
  return (
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className='light:bg-purple-100 dark:bg-black border-primary border rounded-lg shadow-lg opacity-100 transform transition-all'>
        <DropdownMenuItem onClick={() => setTheme("light")} className='p-2'>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className='p-2'>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className='p-2'>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
      </DropdownMenu>
  )
}

export default ThemeToggle