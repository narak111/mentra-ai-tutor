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
    <main className=" max-w-4xl items-center justify-center">
      {canCreateCompanion ? (
        <article className="w-full gap-4 flex flex-col">
          <h1>Companion Builder</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="flex flex-col items-center text-center space-y-6">
          <Image
            src="/images/limit.svg"
            alt="Companion Limit Reached"
            width={300}
            height={300}
            className="mx-auto w-64 h-auto sm:w-80"
            priority
          />

          <div className="cta-badge">
            Upgrade your plan
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold">
            You&apos;ve Reached Your Limit
          </h1>

          <p className="max-w-md text-muted-foreground text-base sm:text-lg">
            You&apos;ve reached your Companion limit. Please upgrade to create
            more companions and get access to additional premium features.
          </p>

          <Button
            asChild
            variant="default"
            size="lg"
            className="rounded-xl w-full justify-center"
          >
            <Link href="/pricing">Upgrade My Plan</Link>
          </Button>
        </article>
      )}
    </main>
  )
}
