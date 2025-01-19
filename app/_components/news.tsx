import { NewsHeader } from "./news-header";
import { NewsList } from "./news-list";

export const News = () => {
    // Construct the query using URLSearchParams
    const queryParams = new URLSearchParams({
        access_key: process.env.API_KEY || "",
    });

    const apiUrl = `${process.env.NEWS_API}?${queryParams.toString()}`;

    return (
        <div className="container mx-auto px-4 py-8 border-t border-neutral-400">
            <NewsHeader />
            <NewsList query={apiUrl} />
        </div>
    );
};
