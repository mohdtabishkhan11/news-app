import { Button } from "@/components/ui/button";
import { categories } from "@/lib/categories";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

export function InterestSelection({
    selectedInterest,
    onChange,
}: {
    selectedInterest: string;
    onChange: (id: string) => void;
}) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200;
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className=" relative max-w-3xl mx-auto no-scrollbar">
            <div className="flex items-center">
                <div className="w-full flex items-center gap-4 ">
                    <div
                        ref={scrollContainerRef}
                        className="flex space-x-2 p-2 overflow-x-auto no-scrollbar"
                    >
                        {categories.map((interest) => (
                            <Button
                                key={interest.id}
                                variant={selectedInterest === interest.id ? "default" : "outline"}
                                size="sm"
                                className="rounded-sm whitespace-nowrap"
                                onClick={() => {
                                    onChange(interest.id);
                                }}
                            >
                                {interest.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
