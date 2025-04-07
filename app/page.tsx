"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
   const { language } = useLanguage();

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="relative h-[50vh] rounded-tl-[50%_20%] rounded-tr-[50%_20%]">
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 lg:py-32 bg-gradient-to-b from-purple-200 via-purple-100 to-white">
      {/* Circular Image */}
      <motion.div
      
      initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden ">
        <Image
          src="/pta-logo-nobg.png" // Change to your actual image
          alt="Hero Image"
          layout="fill"
          objectFit="fill"
          className="shadow-lg"
        />
      </motion.div>

      {/* Text Content */}
      <motion.h1 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-6">
        {language == 'cy' ? 'Croeso i PTA' : 'Welcome to PTA'}
      </motion.h1>
      <motion.p
      
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      className="text-lg md:text-xl text-gray-600 mt-4 max-w-xl">
        {language == 'cy' ? "Mae ein CRhA yn ymroddedig i gefnogi ein myfyrwyr a'n hathrawon a gwella'r profiad addysgol i bawb. Ar y safle hwn, fe welwch wybodaeth am ddigwyddiadau sydd ar y gweill, cyfleoedd i wirfoddoli, a ffyrdd o gymryd rhan. Gobeithio y byddwch yn ymuno â ni i wneud gwahaniaeth yng nghymuned ein hysgolion!." : "Our PTA is dedicated to supporting our students and teachers and enhancing the educational experience for all. On this site, you'll find information about upcoming events, volunteer opportunities, and ways to get involved. We hope you'll join us in making a difference in our school community"}
      </motion.p>

      {/* CTA Button */}
      <Button className="mt-6 px-6 py-3 text-lg font-semibold">
        Get Started
      </Button>
    </section>
       
  
        <section className="relative w-full min-w-full bg-[#653499] shadow-lg h-[50vh] rounded-l-[50%_20%] rounded-r-[50%_20%]">

        </section>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
