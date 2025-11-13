import Image from "next/image";
import Link from "next/link";
import NavItems from "@/components/NavItems";
import { Button } from "@/components/ui/button";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
    return (
        <nav className="navbar" >
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-2 py-3">
                <Link href="/" className="flex items-center gap-2 group" title="Home">
                    <Image
                        src="/icons/8.ico"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="transition-transform duration-300 group-hover:scale-110"
                        priority
                    />
                    <span className="font-semibold text-2xl hidden sm:inline-block">
                        AI Tutor
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    <NavItems />
                    <SignedOut>
                        <SignInButton>
                            <Button className="px-6 rounded-xl capitalize" >
                                sign in
                            </Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
}