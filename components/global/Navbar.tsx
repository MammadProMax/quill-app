import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";

import { buttonVariants } from "../ui/button";

import NavbarLinks from "./NavbarLinks";
import MobileNav from "./MobileNav";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ThemeSwitch from "./ThemeSwitch";

export default async function Navbar() {
   const { getUser } = getKindeServerSession();
   const user = await getUser();

   return (
      <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-b-border bg-background/60 backdrop-blur-lg transition-all">
         <MaxWidthWrapper>
            <div className="flex h-14 items-center justify-between border-b">
               <div className="flex items-center w-fit gap-5">
                  <Link href="/" className="flex z-40 font-semibold font-sans">
                     <span>Quill</span>
                  </Link>
                  <ThemeSwitch />
               </div>

               <MobileNav user={user} />

               <div className="hidden items-center gap-x-4 sm:flex">
                  <Link
                     href={"/pricing"}
                     className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                     })}
                  >
                     تعرفه ها
                  </Link>
                  <NavbarLinks />
               </div>
            </div>
         </MaxWidthWrapper>
      </nav>
   );
}
