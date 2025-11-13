import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

export default function CTA() {
    return (
        <section className="cta-section bg-neutral-600">
            <div className="cta-badge">
                Start learning your way.
            </div>
            <h2 className="text-3xl font-bold">Build and personalize your learning experience.</h2>
            <p>
                Pick a name, subject, voice & personality &rarr; and start learning through interactive sessions with your AI companion that feel natural and fun.
            </p>

            <Image
                src="/images/cta.svg"
                alt="CTA Image"
                width={362}
                height={232}
            />
            <Button size="lg" className="rounded-2xl">
                <Image
                    src="/icons/plus.svg"
                    alt="plus"
                    width={15}
                    height={15}
                />
                <Link href="/companions/new">
                    Create Your New Companion
                </Link>
            </Button>
        </section>
    )
}
