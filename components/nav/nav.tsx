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
  "bg-transparent px-3 py-1.5 text-[13px] font-black text-white uppercase tracking-wide transition-all hover:bg-yellow-300 hover:text-black focus:bg-yellow-300 focus:text-black data-[state=open]:bg-yellow-300 data-[state=open]:text-black border-0 shadow-none rounded-none";

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
  const [submenuOpen, setSubmenuOpen] = React.useState<{ [key: string]: boolean }>({});
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
    <header className="fixed top-0 left-0 w-full z-50 bg-purple-900 border-b-2 border-black">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/">
          <Logo />
        </Link>

        {/* Mobile Slide-in Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/60 md:hidden"
                onClick={closeMobileMenu}
              />
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 z-50 flex h-screen w-screen flex-col overflow-y-auto bg-purple-900 border-l-2 border-black px-5 pb-6 pt-5 md:hidden"
              >
                <div className="mb-6 flex items-center justify-between border-b-2 border-black pb-4">
                  <Logo />
                  <button onClick={closeMobileMenu} aria-label="Close menu">
                    <X className="h-7 w-7 text-white" />
                  </button>
                </div>

                <div className="mb-5 flex items-center gap-3">
                  <LanguageToggle />
                  <div className="md:hidden">
                    <CartDrawer />
                  </div>
                </div>

                <nav className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <div key={link.titleEng} className="border-2 border-black bg-purple-800 px-4 py-3 shadow-[3px_3px_0px_0px_#000]">
                      {link.subLinks.length > 0 ? (
                        <div>
                          <button
                            onClick={() => toggleSubmenu(link.titleEng)}
                            className="flex w-full items-center justify-between text-left text-base font-black uppercase tracking-wide text-white"
                          >
                            <span>{language === "cy" ? link.titleWal : link.titleEng}</span>
                            <motion.span
                              animate={{ rotate: submenuOpen[link.titleEng] ? 180 : 0 }}
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
                                className="mt-3 ml-1 grid gap-2 overflow-hidden"
                              >
                                {link.subLinks.map((subLink) => (
                                  <Link
                                    key={subLink.titleEng}
                                    href={subLink.href}
                                    onClick={closeMobileMenu}
                                    className="border-l-4 border-yellow-300 pl-3 py-1 text-sm font-semibold text-purple-200 hover:text-white"
                                  >
                                    {language === "cy" ? subLink.titleWal : subLink.titleEng}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link href={link.href} onClick={closeMobileMenu} className="block text-base font-black uppercase tracking-wide text-white">
                          {language === "cy" ? link.titleWal : link.titleEng}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                {clerkEnabled && (
                  <div className="mt-6">
                    <SignedOut>
                      <div className="inline-block bg-yellow-300 text-black font-black text-sm uppercase tracking-wide px-5 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer">
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
                  </div>
                )}
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-1">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.titleEng} className="relative">
                {link.subLinks.length > 0 ? (
                  <>
                    <NavigationMenuTrigger className={desktopNavLinkClass}>
                      {language === "cy" ? link.titleWal : link.titleEng}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-0 p-0 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] border-2 border-black shadow-[6px_6px_0px_0px_#000] bg-white">
                        <li className="row-span-3 border-r-2 border-black">
                          <NavigationMenuLink asChild>
                            <Link
                              href={link.href}
                              className="flex h-full w-full select-none flex-col justify-end bg-purple-100 p-6 no-underline outline-none"
                            >
                              <Image
                                src={link.img}
                                width={100}
                                height={100}
                                className="h-full w-full object-contain"
                                alt={link.img}
                              />
                              <div className="mb-1 mt-4 text-sm font-black uppercase tracking-wide text-black">
                                {language === "cy" ? link.titleWal : link.titleEng}
                              </div>
                              <p className="text-xs leading-tight text-gray-600">
                                {language === "cy" ? link.navDescriptionWal : link.navDescriptionEng}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        {link.subLinks.map((subLink) => (
                          <ListItem
                            key={subLink.titleEng}
                            title={language === "cy" ? subLink.titleWal : subLink.titleEng}
                            href={subLink.href}
                          >
                            {language === "cy" ? subLink.descriptionWal : subLink.descriptionEng}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link href={link.href} className={cn(desktopNavLinkClass, "inline-flex items-center")}>
                      {language === "cy" ? link.titleWal : link.titleEng}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side: auth + toggles */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <CartDrawer />
          {clerkEnabled ? (
            <>
              <SignedOut>
                <div className="inline-block bg-yellow-300 text-black font-black text-xs uppercase tracking-wide px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer">
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
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
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="border-b-2 border-black last:border-b-0">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none px-4 py-3 leading-none no-underline outline-none transition-colors hover:bg-purple-50 border-l-4 border-transparent hover:border-purple-600",
            className
          )}
          {...props}
        >
          <div className="text-sm font-black uppercase tracking-tight mb-0.5">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-gray-500">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
