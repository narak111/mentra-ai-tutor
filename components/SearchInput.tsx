"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils"

export default function SearchInput() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("topic") || '';

    const [searchQuery, setSearchQuery] = useState(query);

    useEffect(() => {
        setTimeout(() => {
            if (searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                });

                router.push(newUrl, { scroll: false });
            } else {
                if (pathname === '/companions') {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["topic"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, router, pathname]);

    return (
        <div className="relative border border-gray-200 items-center rounded-lg flex px-2 h-fit">
            <Search
                className="text-gray-500 h-5 w-5'"
                size={20}
            />
            <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search companions..."
                className="border-0! outline-0! focus:ring-0! shadow-none!"
            />
        </div>
    )
}
