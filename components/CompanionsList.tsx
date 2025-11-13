"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Clock } from 'lucide-react';

interface CompanionsListProps {
    title: string;
    companions?: Companion[];
    classNames?: string;
}

export default function CompanionsList({ title, companions, classNames }: CompanionsListProps) {
    return (
        <article className={cn('companion-list', classNames)}>
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg w-2/3">Lessons</TableHead>
                        <TableHead className="text-lg" >Subjects</TableHead>
                        <TableHead className="text-lg text-right">Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companions?.map(({ id, subject, name, topic, duration, }, index) => (
                        <TableRow key={index} >
                            <TableCell>
                                <Link href={`/companions/${id}`} >
                                    <div className="flex items-center gap-3">
                                        <div className="size-[72px] flex items-center justify-center rounded-xl max-md:hidden" style={{ backgroundColor: getSubjectColor(subject) }}>
                                            <Image
                                                src={`/icons/${subject}.svg`}
                                                alt="subject"
                                                width={35}
                                                height={35}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="font-semibold text-xl leading-tight">{name}</p>
                                            <p className="text-base text-muted-foreground truncate max-w-[220px] md:max-w-[300px] lg:max-w-[400px]"
                                                title={topic}
                                            >
                                                {topic}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className="subject w-fit max-md:hidden subject-badge">{subject}</div>
                                <div className="flex items-center w-fit p-2 lg:p-0 rounded-lg justify-center md:hidden" style={{ backgroundColor: getSubjectColor(subject) }}>
                                    <Image
                                        src={`/icons/${subject}.svg`}
                                        alt="subject"
                                        width={18}
                                        height={18}
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 justify-end w-full">
                                    <p className="text-xl">
                                        {duration} {' '}
                                        <span className="max-md:hidden">
                                            mins
                                        </span>
                                    </p>
                                    <Clock className="w-5 h-5" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </article>
    )
}