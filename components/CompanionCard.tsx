import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Bookmark } from 'lucide-react';

interface CompanionCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
}

export default function CompanionCard({ id, name, topic, subject, duration, color, }: CompanionCardProps) {
    return (
        <article className="companion-card" style={{ backgroundColor: color }}>
            <div className="flex justify-between items-center">
                <div className="subject-badge">{subject}</div>
                <Button
                    size="icon"
                    className="rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white p-2">
                    <Bookmark className="w-5 h-5" />
                </Button>
            </div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-gray-700">{topic}</p>
            <div className="flex items-center gap-2">
                <Clock className="w-4.5 h-4.5" />
                <p className="text-sm">
                    {duration} minutes
                </p>
            </div>
            <Link href={`/companions/${id}`}>
                <Button variant="default" className="w-full rounded-xl justify-center" >
                    Launch Lesson
                </Button>
            </Link >
        </article>
    )
}