import Image from "next/image";
import Link from "next/link";
import NavItems from "@/components/NavItems";
import { Button } from "./ui/button";

export default function Navbar() {
    return (
        <nav className="navbar" >
            <Link href="/">
                <div className="flex items-center gap-2 5 cursor-pointer">
                    <Image
                        src="/icons/logo.svg"
                        alt="Logo"
                        width={40}
                        height={40}
                    />
                </div>
            </Link>
            <div className="flex items-center gap-8">
                <NavItems />
                <Button>
                    Sign In
                </Button>
            </div>
        </nav>
    );
}