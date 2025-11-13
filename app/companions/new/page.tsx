import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermission } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function NewCompanion() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const canCreateCompanion = await newCompanionPermission();

  return (
    <main className="lg:w-1/3 min-md:2-2/3 items-center justify-center">
      {canCreateCompanion ? (
        <article className="w-full gap-4 flex flex-col">
          <h1>Companion Builder</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="companion-limit" >
          <Image
            src="/images/limit.svg"
            alt="Companion Limit Reached"
            width={350}
            height={350}
          />
          <div className="cta-badge">
            Upgrade your plan
          </div>
          <h1 className="text-2xl font-bold">
            You&apos;ve Reached Your Limit
          </h1>
          <p className="text-base">
            You&apos;ve reached your Companion limit. Please upgrade to create more companions and get access to more premium feature.
          </p>
          <Button asChild variant="default" size="lg" className="rounded-xl w-full justify-center"          >
            <Link href="/pricing">
              Upgrade My Plan
            </Link>
          </Button>
        </article>
      )}
    </main>
  )
}
