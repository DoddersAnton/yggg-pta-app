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
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { Info, Menu, X } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "../providers/language-provider";
import Image from "next/image";

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
        href: "/about/overview",
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
        titleEng: "Activities Funded",
        titleWal: "Gweithgareddau a Ariannwyd",
        descriptionEng: "Find out what we have funded",
        descriptionWal: "Darganfod beth rydym wedi'i ariannu",
        href: "/whatwedo#activitiesfunded",
      },
      {
        titleEng: "Partyware for hire",
        titleWal: "Partyware i'w llogi",
        descriptionEng: "We have a range of partyware available for hire",
        descriptionWal: "Mae gennym amrywiaeth o offer parti ar gael i'w llogi",
        href: "/whatwedo#partywarehire",
      },
      {
        titleEng: "Clwb 50:50",
        titleWal: "Clwb 50:50",
        descriptionEng: "Join our monthly draw",
        descriptionWal: "Ymunwch â'n tynnu misol",
        href: "/whatwedo#clwb5050",
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

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function Nav() {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [submenuOpen, setSubmenuOpen] = React.useState<{
    [key: string]: boolean;
  }>({});
  const { language } = useLanguage();

  const toggleSubmenu = (key: string) => {
    setSubmenuOpen((prev) => ({ ...prev, [key]: !prev[key] }));
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

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 w-full bg-white dark:bg-black shadow-lg rounded-lg p-4 flex flex-col gap-2 md:hidden"
            >
              {navLinks.map((link) => (
                <div key={link.titleEng} className="relative group">
                  {link.subLinks.length > 0 ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(link.titleEng)}
                        className="w-full text-left text-sm font-medium hover:text-primary flex items-center"
                      >
                        {language === "cy" ? link.titleWal : link.titleEng}
                        <motion.span
                          animate={{
                            rotate: submenuOpen[link.titleEng] ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="ml-2 text-[8px]"
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
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="ml-4 mt-2 flex flex-col gap-2"
                          >
                            {link.subLinks.map((subLink) => (
                              <Link
                                key={subLink.titleEng}
                                href={subLink.href}
                                className="block text-sm font-medium hover:text-primary"
                              >
                                {language === "cy"
                                  ? subLink.titleWal
                                  : subLink.titleEng}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block text-sm font-medium hover:text-primary"
                    >
                      {language === "cy" ? link.titleWal : link.titleEng}
                    </Link>
                  )}
                </div>
              ))}
            </motion.div>
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
                    <NavigationMenuTrigger className="hover:text-primary text-[12.5px]">
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
                      className={`${navigationMenuTriggerStyle()} text-[12.5px]`}
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
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <SignedOut>
            <div className="hover:text-primary text-[12.5px]">
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <ThemeToggle />
          {/* Mobile Menu Toggle Button (Hidden on md+) */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? (
              <X className="h-6 w-6 p-0" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
