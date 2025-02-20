import React from "react";
import "./UniqueCategories.scss";

interface Category {
    section?: string;
    byline?: string;
    source?: string | { id: number; name: string };
}

interface UniqueSectionsProps {
    categories: Category[];
    view: "category" | "author" | "source"; // Determines what to display
    onSelect?: (selectedItem: string) => void; // Pass selected item
}

const UniqueSections: React.FC<UniqueSectionsProps> = ({ categories, view, onSelect }) => {
    // Extract the correct field based on 'view'
    const uniqueItems = Array.from(
        new Set(
            categories
                .map(category => {
                    if (view === "category") return category.section;
                    if (view === "author") return category.byline;
                    if (view === "source") {
                        return typeof category.source === "object" ? category.source.name : category.source;
                    }
                    return null;
                })
                .filter(Boolean) as string[]
        )
    ).slice(0, 12); // Limit to 12 items

    return (
        <>
            {uniqueItems.length > 0 && (
                <ul className="categories-menu">
                    {uniqueItems.map((item, index) => (
                        <li key={index}>
                            <button className="category-link" onClick={() => onSelect?.(item)}>
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default UniqueSections;
