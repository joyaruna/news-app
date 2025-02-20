export interface Category {
    title: string;
    byline?: string;
    section?: string;
    abstract?: string;
    multimedia?: Multimedia[];
}

export interface News {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    content: string;
}

interface Multimedia {
    url: string;
    caption?: string;
}