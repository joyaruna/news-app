export interface Category {
    section?: string;
    byline?: string;
    source?: string | { id: string; name: string }; // Handle case where source is an object
    title?: string;
    author?: string;
    description?: string;
    urlToImage?: string;
}
