"use client";
import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Footer } from "@/components/footer";


export const NewsHomepage = () => {
    const newsabout = "/news_about.jpg";


    const [currentSlide, setCurrentSlide] = useState(0);

    const sliderData = [
        {
            id: 1,
            title: "Breaking News: Global Summit",
            description: "World leaders gather to discuss climate change",
            image: "./global_submit.jpg"
        },
        {
            id: 2,
            title: "Technology Revolution",
            description: "Latest innovations shaping our future",
            image: "./tech_revolution.jpg"
        },
        {
            id: 3,
            title: "Cultural Highlights",
            description: "Celebrating diversity around the world",
            image: "./cultural_highlight.jpg"
        }
    ];

    const featuredNews = [
        {
            id: 1,
            title: "Major Scientific Breakthrough in Renewable Energy",
            category: "Science",
            readTime: "5 min read",
            imageUrl: "/api/placeholder/800/400"
        },
        {
            id: 2,
            title: "Global Economic Summit Concludes with New Agreements",
            category: "Business",
            readTime: "4 min read",
            imageUrl: "/api/placeholder/800/400"
        },
        {
            id: 3,
            title: "Revolutionary AI Model Makes Breakthrough in Healthcare",
            category: "Technology",
            readTime: "6 min read",
            imageUrl: "/api/placeholder/800/400"
        }
    ];

    // const topStories = [
    //     {
    //         id: 4,
    //         title: "Space Exploration: New Discoveries on Mars",
    //         category: "Science",
    //         readTime: "3 min read",
    //     },
    //     {
    //         id: 5,
    //         title: "Tech Giants Announce Collaborative AI Ethics Initiative",
    //         category: "Technology",
    //         readTime: "4 min read",
    //     },
    //     {
    //         id: 6,
    //         title: "Global Climate Summit: Key Takeaways",
    //         category: "Environment",
    //         readTime: "5 min read",
    //     }
    // ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderData.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <Menu className="h-6 w-6 mr-4 text-gray-500" />
                            <span className="text-xl font-bold">NewsApp</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Search className="h-6 w-6 text-gray-500" />
                            <Bell className="h-6 w-6 text-gray-500" />
                            <UserPlus className="h-6 w-6 text-gray-500" />
                            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Slider */}
                <section className="mb-12 relative">
                    <div className="relative h-[500px] overflow-hidden rounded-lg">
                        {sliderData.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`absolute w-full h-full transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                                    <h2 className="text-white text-3xl font-bold mb-2">{slide.title}</h2>
                                    <p className="text-white text-lg">{slide.description}</p>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                            {sliderData.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                                        }`}
                                    onClick={() => setCurrentSlide(index)}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-3xl font-bold mb-4">About NewsApp</h2>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-gray-600 mb-4">
                                NewsApp is your trusted source for breaking news, in-depth analysis, and compelling stories from around the globe. Our dedicated team of journalists works tirelessly to bring you accurate, unbiased reporting on the issues that matter most.
                            </p>
                            <p className="text-gray-600 mb-4">
                                We believe in the power of informed citizens and strive to provide comprehensive coverage across politics, technology, science, culture, and more. Our commitment to journalistic excellence and integrity ensures that you stay well-informed in today's fast-paced world.
                            </p>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Learn More
                            </button>
                        </div>
                        <div className="relative h-64">
                            <img
                                src={newsabout}
                                alt="NewsApp Team"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </section>

                {/* Featured News Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Featured News</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredNews.map((news) => (
                            <Card key={news.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-0">
                                    <img
                                        src={news.imageUrl}
                                        alt={news.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-blue-600">{news.category}</span>
                                            <span className="text-sm text-gray-500">{news.readTime}</span>
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2">{news.title}</h3>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Top Stories Section */}
                {/* <section>
                    <h2 className="text-2xl font-bold mb-6">Top Stories</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {topStories.map((story) => (
                            <Card key={story.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-blue-600">{story.category}</span>
                                        <span className="text-sm text-gray-500">{story.readTime}</span>
                                    </div>
                                    <h3 className="font-semibold text-lg">{story.title}</h3>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section> */}
            </main>
            <Footer />

        </div>
    );
};

export default NewsHomepage;