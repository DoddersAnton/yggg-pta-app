"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

import Logo from "./Logo";
import { Menu, X } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "../providers/language-provider";
import Image from "next/image";
import CartDrawer from "../cart/cart-drawer";

const desktopNavLinkClass =
  "relative bg-transparent px-2 py-1 text-[12.5px] font-medium text-foreground transition-colors hover:bg-transparent hover:text-primary focus:bg-transparent data-[state=open]:bg-transparent after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 hover:after:scale-x-100 data-[state=open]:after:scale-x-100";

const navLinks: {
  titleEng: string;
  titleWal: string;
  img: string;
  navDescriptionEng: string;
  navDescriptionWal: string;
  href: string;
  icon: string;
  subLinks: {
    titleEng: string;
    titleWal: string;
    href: string;
    descriptionEng: string;
    descriptionWal: string;
  }[];
}[] = [
  {
    titleEng: "About Us",
    titleWal: "Amdanom ni",
    img: "/backtoschool-nobg.png",
    navDescriptionEng: "All essential information about the PTA",
    navDescriptionWal: "Holl wybodaeth hanfodol am y CRhA",
    href: "/about",
    icon: "MdInfo",
    subLinks: [
      {
        titleEng: "Our Mission",
        titleWal: "Ein Cenhadaeth",
        descriptionEng: "Find out more about the PTA and what we do",
        descriptionWal: "Darganfod mwy am y CRhA a beth rydym yn ei wneud",
        href: "/about",
      },
      {
        titleEng: "Meet the PTA",
        titleWal: "Cwrdd â'r CRhA",
        descriptionEng: "Meet the team and find out who we are",
        descriptionWal: "Cwrdd â'r tîm a darganfod pwy ydym ni",
        href: "/about/meetthepta",
      },
      {
        titleEng: "Reports & Documents",
        titleWal: "Adroddiadau a Dogfennau",
        descriptionEng: "View our reports and documents",
        descriptionWal: "Gweld ein hadroddiadau a dogfennau",
        href: "/about/documents",
      },
    ],
  },

  {
    titleEng: "Fundraising",
    titleWal: "Codi Arian",
    img: "/family-nobg.png",
    navDescriptionEng: "All the ways we raise money for the school",
    navDescriptionWal: "Pob ffordd rydym yn codi arian ar gyfer yr ysgol",
    href: "/fundraising",
    icon: "TbHeartHandshake",
    subLinks: [
      {
        titleEng: "Fundraising Priorities",
        titleWal: "Blaenoriaethau Codi Arian",
        descriptionEng: "See what we are currently raising money for",
        descriptionWal: "Gweld beth rydym yn codi arian ar ei gyfer ar hyn o bryd",
        href: "/fundraising",
      },
      {
        titleEng: "Community Achievements",
        titleWal: "Cyflawniadau'r Gymuned",
        descriptionEng: "Discover what has already been funded by PTA efforts",
        descriptionWal: "Darganfod beth sydd eisoes wedi'i ariannu gan y CRhA",
        href: "/community-achievements",
      },
      {
        titleEng: "Upcoming Events",
        titleWal: "Digwyddiadau i Ddod",
        descriptionEng: "Browse events supporting our current campaigns",
        descriptionWal: "Porwch ddigwyddiadau sy'n cefnogi ein hymgyrchoedd cyfredol",
        href: "/events",
      },
    ],
  },
  {
    titleEng: "Events",
    titleWal: "Digwyddiadau",
    img: "/events-nobg.png",
    navDescriptionEng: "All the events we have planned",
    navDescriptionWal: "Pob digwyddiad rydym wedi'i gynllunio",
    href: "/events",
    icon: "MdSeat",
    subLinks: [],
  },
  {
    titleEng: "Contact Us",
    titleWal: "Cysylltwch â ni",
    img: "/contact-nobg.png",
    navDescriptionEng: "Get in touch with the PTA",
    navDescriptionWal: "Cysylltwch â'r CRhA",
    href: "/contactus",
    icon: "TfiAnnouncement",
    subLinks: [],
  },
];

export function Nav() {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [submenuOpen, setSubmenuOpen] = React.useState<{
    [key: string]: boolean;
  }>({});
  const { language } = useLanguage();
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  const toggleSubmenu = (key: string) => {
    setSubmenuOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setSubmenuOpen({});
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/30 dark:bg-black/30 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Left Section: Logo & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>

        {/* Mobile Slide-in Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/40 md:hidden"
                onClick={closeMobileMenu}
              />
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 z-50 flex h-screen w-screen flex-col overflow-y-auto bg-white px-5 pb-6 pt-5 md:hidden"
              >
                <div className="mb-6 flex items-center justify-between">
                  <Logo />
                  <button onClick={closeMobileMenu} aria-label="Close menu">
                    <X className="h-7 w-7" />
                  </button>
                </div>

                <div className="mb-5 flex items-center gap-2">
                  <LanguageToggle />
                  <div className="md:hidden">
                    <CartDrawer />
                  </div>
                </div>

                <nav className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <div key={link.titleEng} className="rounded-xl border bg-muted/20 px-4 py-3">
                      {link.subLinks.length > 0 ? (
                        <div>
                          <button
                            onClick={() => toggleSubmenu(link.titleEng)}
                            className="flex w-full items-center justify-between text-left text-base font-semibold leading-tight"
                          >
                            <span>{language === "cy" ? link.titleWal : link.titleEng}</span>
                            <motion.span
                              animate={{
                                rotate: submenuOpen[link.titleEng] ? 180 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                              className="text-xs"
                            >
                              ▼
                            </motion.span>
                          </button>
                          <AnimatePresence>
                            {submenuOpen[link.titleEng] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-3 ml-1 grid gap-2"
                              >
                                {link.subLinks.map((subLink) => (
                                  <Link
                                    key={subLink.titleEng}
                                    href={subLink.href}
                                    onClick={closeMobileMenu}
                                    className="rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-primary"
                                  >
                                    {language === "cy" ? subLink.titleWal : subLink.titleEng}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link href={link.href} onClick={closeMobileMenu} className="block py-1 text-base font-semibold leading-tight">
                          {language === "cy" ? link.titleWal : link.titleEng}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex text-[14px]">
            {navLinks.map((link) => (
              <NavigationMenuItem
                key={link.titleEng}
                className="relative group"
              >
                {link.subLinks.length > 0 ? (
                  <>
                    <NavigationMenuTrigger className={desktopNavLinkClass}>
                      {language === "cy" ? link.titleWal : link.titleEng}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-1 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              href={link.href}
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-white to-purple-50 p-6 no-underline outline-none focus:shadow-md"
                            >
                              <Image
                                src={link.img}
                                width={100}
                                height={100}
                                className="h-full w-full"
                                alt={link.img}
                              />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                {language === "cy"
                                  ? link.titleWal
                                  : link.titleEng}
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                {language === "cy"
                                  ? link.navDescriptionWal
                                  : link.navDescriptionEng}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        {link.subLinks.map((subLink) => (
                          <ListItem
                            key={subLink.titleEng}
                            title={
                              language === "cy"
                                ? subLink.titleWal
                                : subLink.titleEng
                            }
                            href={subLink.href}
                          >
                            {language === "cy"
                              ? subLink.descriptionWal
                              : subLink.descriptionEng}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className={cn(navigationMenuTriggerStyle(), desktopNavLinkClass)}
                    >
                      {language === "cy" ? link.titleWal : link.titleEng}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth and Theme Toggle */}
        <div className="hidden items-center gap-4 md:flex">
          <LanguageToggle />
          <CartDrawer />
          {clerkEnabled ? (
            <>
              <SignedOut>
                <div className="hover:text-primary text-[12.5px]">
                  <SignInButton />
                </div>
              </SignedOut>
              <SignedIn>
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Link
                      href="/dashboard"
                      label={language === "cy" ? "Fy Nigwyddiadau" : "My Events"}
                      labelIcon={<span>🎟️</span>}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </SignedIn>
            </>
          ) : null}
        
        </div>

        {/* Mobile Menu Toggle Button (Hidden on md+) */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Open menu"
          type="button"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
