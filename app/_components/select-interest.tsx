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

    // const toggleInterest = (interest: string) => {
    //     setSelectedInterests((prev) =>
    //         prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    //     );
    // };

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
                {/* <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 z-10 shadow-xl"
                    onClick={() => scroll("left")}
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Scroll left</span>
                </Button> */}
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
                {/* <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 z-10 shadow-xl "
                    onClick={() => scroll("right")}
                >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Scroll right</span>
                </Button> */}
            </div>
        </div>
    );
}
