"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants"
import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"
import { Loader } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(1, { message: "Companion name required" }),
    subject: z.string().min(1, { message: "Subject required" }),
    topic: z.string().min(1, { message: "Topic required" }),
    voice: z.string().min(1, { message: "Voice required" }),
    style: z.string().min(1, { message: "Style required" }),
    duration: z.number().min(1, { message: "Duration required" })
})

export default function CompanionForm() {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            topic: "",
            voice: "",
            style: "",
            duration: 15,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            console.log("Submitted values:", values);
            setTimeout(() => {
                console.log("Companion created successfully!");
                setIsLoading(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to create companion:", error);
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel >Name</FormLabel>
                            <FormControl>
                                <Input autoComplete="on" placeholder="Enter a companion name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                            >
                                <SelectTrigger className="w-full capitalize">
                                    <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel className="sr-only">Subjects</SelectLabel>
                                        {subjects.map((subject) => (
                                            <SelectItem key={subject} value={subject} className="capitalize">
                                                {subject}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What should the companion help you with?</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ex. Quantum Mechanics, Shakespearean Literature, etc."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voice</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                            >
                                <SelectTrigger className="w-full capitalize">
                                    <SelectValue placeholder="Select a voice" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel className="sr-only">Voices</SelectLabel>
                                        <SelectItem value="male" className="capitalize">
                                            male
                                        </SelectItem>
                                        <SelectItem value="female" className="capitalize">
                                            female
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Style</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                            >
                                <SelectTrigger className="w-full capitalize">
                                    <SelectValue placeholder="Select a style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel className="sr-only">Styles</SelectLabel>
                                        <SelectItem value="formal" className="capitalize">
                                            formal
                                        </SelectItem>
                                        <SelectItem value="casual" className="capitalize">
                                            casual
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Esstimated session duration in minutes</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter a duration"
                                    {...field}
                                    value={field.value ?? ""}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ?
                        <>
                            <Loader className="animate-spin" />
                            Creating Companion...
                        </>
                        : "Create Companion"}
                </Button>
            </form>
        </Form>
    )
}
