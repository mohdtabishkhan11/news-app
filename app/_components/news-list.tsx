"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Card, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { initialData } from "@/lib/data";
import { IArticle } from "@/lib/types";
import { LoaderIcon } from "lucide-react";
import { cn, isInSequence } from "@/lib/utils";
import { InterestSelection } from "./select-interest";
import { CountrySelection } from "./select-countries";
import Link from 'next/link';

const fallbackImage = "/brknews.jpg";
const ITEMS_PER_PAGE = 8;

function NewsItem({ article, styles }: { article: IArticle; styles: string }) {
    const [imageError, setImageError] = useState(false);

    return (
<Link href={article.url ?? ""}>
        <Card className={cn("flex flex-col shadow-lg overflow-hidden", styles)}>
            <div className="relative grow">
                {article.image ? (
                    <Image
                        src={imageError ? fallbackImage : article.image}
                        alt={article.title || ""}
                        fill
                        onError={() => setImageError(true)}
                        className="object-contain md:object-cover object-center"
                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 30vw, 13vw"
                    />
                ) : (
                    <Image
                        src={fallbackImage}
                        alt="Fallback Image"
                        fill
                        className="object-cover object-center"
                        role="img"
                        aria-label="Fallback image"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}
            </div>
            {/* <CardContent className="py-5 mt-auto">
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{article.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                    <Badge
                        key={article.category}
                        variant="secondary"
                        className="shadow-md capitalize"
                    >
                        {article.category}
                    </Badge>
                </div>
                <p className="text-xs text-gray-500">
                    Published: {new Date(article.published_at || "").toLocaleDateString()}
                </p>
            </CardContent> */}
            <CardFooter className="text-ellipsis py-4 block space-y-1">
                <h2 className="text-lg font-medium truncate">{article.title}</h2>
                <p className="block text-base text-neutral-600 truncate">{article.description}</p>
                {/* <Button asChild className="w-full">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                        Read More
                    </a>
                </Button> */}
                <Badge
                    key={article.category}
                    variant="secondary"
                    className="shadow-md capitalize mt-3"
                >
                    {article.source}
                </Badge>
            </CardFooter>
        </Card>
</Link>
    );
}

export function NewsList({ query }: { query: string }) {
    const [news, setNews] = useState<IArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedInterest, setSelectedInterest] = useState<string>("general");
    const [selectedCountry, setSelectedCountry] = useState<null | { code: string; name: string }>(
        null
    );

    const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentNews = news.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push("...");
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1);
                pageNumbers.push("...");
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push("...");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push("...");
                pageNumbers.push(totalPages);
            }
        }
        return pageNumbers;
    };

    const onChange = (id: string) => {
        setSelectedInterest(id);
    };

    const onCountryChange = (country: { code: string; name: string }) => {
        // User wanted to deselect
        if (country.code === selectedCountry?.code) {
            console.log("ondeselect");
            setSelectedCountry(null);
            return;
        }
        setSelectedCountry(country);
    };

    useEffect(() => {
        if (!query) return;

        (async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `${query}&categories=${selectedInterest}&countries=${
                        selectedCountry?.code || ""
                    }`
                );
                const data = await res.json();

                if (data?.data) {
                    setNews(data.data);
                    return;
                }

                setNews(initialData.data as IArticle[]);
            } catch (error) {
                console.log("Error fetching news", error);
                setNews([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [query, selectedInterest, selectedCountry]);

    if (loading) {
        return <LoaderIcon className="animate-spin size-8 absolute top-1/2 left-1/2" />;
    }

    return (
        <div className="space-y-6">
            <CountrySelection selectedCountry={selectedCountry} onChange={onCountryChange} />
            <InterestSelection selectedInterest={selectedInterest} onChange={onChange} />

            <div
                className="w-full max-w-3xl mx-auto 
                        grid grid-cols-3 gap-4 
                    "
            >
                {currentNews.length <= 0 ? (
                    <p className="text-center">No Articles found! Please try again later.</p>
                ) : (
                    currentNews.map((article, idx) => {
                        let styles: string;
                        if (isInSequence(idx + 1)) {
                            styles = "col-span-3 md:col-span-3 h-[80vw] md:h-[381px]";
                        } else {
                            styles = "col-span-3 md:col-span-1 h-[80vw] md:h-[290px]";
                        }

                        return <NewsItem key={idx} styles={styles} article={article} />;
                    })
                )}
            </div>

            {totalPages > 1 && (
                <nav aria-label="Page navigation" className="mt-8 flex justify-center">
                    <ul className="flex items-center gap-1 rounded-lg bg-white p-2 shadow-lg">
                        <li>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="flex h-10 items-center justify-center px-4 rounded-lg text-sm font-medium transition-colors
                                         disabled:opacity-50 disabled:cursor-not-allowed
                                         hover:bg-gray-100 disabled:hover:bg-transparent"
                            >
                                Previous
                            </button>
                        </li>

                        {getPageNumbers().map((page, index) => (
                            <li key={index}>
                                <button
                                    onClick={() =>
                                        page !== "..." ? handlePageChange(Number(page)) : null
                                    }
                                    disabled={page === "..."}
                                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors
                                              ${
                                                  page === currentPage
                                                      ? "bg-gray-900 text-white hover:bg-gray-800"
                                                      : "hover:bg-gray-100"
                                              }
                                              ${
                                                  page === "..."
                                                      ? "cursor-default hover:bg-transparent"
                                                      : ""
                                              }`}
                                >
                                    {page}
                                </button>
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="flex h-10 items-center justify-center px-4 rounded-lg text-sm font-medium transition-colors
                                         disabled:opacity-50 disabled:cursor-not-allowed
                                         hover:bg-gray-100 disabled:hover:bg-transparent"
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}
