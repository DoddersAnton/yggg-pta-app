import { Link,  NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@radix-ui/react-navigation-menu'
import * as React from "react";
import Logo from './Logo'

const MobileMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-6">
      <NavigationMenuItem>
            <NavigationMenuTrigger>
            <Logo />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="mt-2">
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <Link href="/docs" title="Introduction">Re-usable components built using Radix UI and Tailwind CSS.</Link>
                <Link href="/docs/installation" title="Installation">How to install dependencies and structure your app.</Link>
                <Link href="/docs/primitives/typography" title="Typography">Styles for headings, paragraphs, lists, etc.</Link>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          </NavigationMenuList>
          </NavigationMenu> 
  )
}

export default MobileMenu