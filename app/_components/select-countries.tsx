import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { countries } from "@/lib/countries";
import { Search } from "lucide-react";
import { useRef, useState } from "react";

export function CountrySelection({
    selectedCountry,
    onChange,
}: {
    selectedCountry: { code: string; name: string } | null;
    onChange: ({ code, name }: { code: string; name: string }) => void;
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <div className="max-w-3xl mx-auto space-y-4">
            <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search countries..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="relative">
                <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                    <div ref={scrollContainerRef} className="flex space-x-2 p-4">
                        {selectedCountry && (
                            <Button
                                key={selectedCountry.code}
                                variant={"default"}
                                size="sm"
                                className="flex-shrink-0"
                                onClick={() => onChange(selectedCountry)}
                            >
                                {selectedCountry.name}
                            </Button>
                        )}
                        {filteredCountries.map((country) => {
                            if (country.code === selectedCountry?.code) return null;
                            return (
                                <Button
                                    key={country.code}
                                    variant={
                                        selectedCountry?.code === country.code
                                            ? "default"
                                            : "outline"
                                    }
                                    size="sm"
                                    className="flex-shrink-0"
                                    onClick={() => onChange(country)}
                                >
                                    {country.name}
                                </Button>
                            );
                        })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    );
}
