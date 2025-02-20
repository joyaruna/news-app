export interface Category {
    title: string;
    byline?: string;
    section?: string;
    abstract?: string;
    multimedia?: Multimedia[];
}

interface Multimedia {
    url: string;
    caption?: string;
}