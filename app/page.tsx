import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";


export default function Page() {
  return (
    <main>
      <h1 className="text-2xl" >Popular Companions</h1>
      <section className="home-section">
        <CompanionCard
          id="1"
          name="Neura the Brain Trainer"
          topic="Cognitive Skills Development"
          subject="Psychology"
          duration={30}
          color="#bde7ff"
        />
        <CompanionCard
          id="2"
          name="Sage the Memory Mentor"
          topic="Memory Enhancement"
          subject="Psychology"
          duration={25}
          color="#ffda6b"
        />
        <CompanionCard
          id="3"
          name="Cortex the Critical Thinker"
          topic="Critical Thinking Skills"
          subject="Science"
          duration={20}
          color="#e5d0ff"
        />

      </section>
      <section className="home-section">
        <CompanionsList
          title="Recently complete Sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  )
}
