import React from "react";
import "./UniqueCategories.scss";

interface Category {
    section?: string;
    byline?: string;
    source?: string;
}

interface UniqueSectionsProps {
    categories: Category[];
    view: "category" | "author" | "source"; // Determines what to display
    onSelect?: (selectedItem: string) => void; // Pass selected item
}

const UniqueSections: React.FC<UniqueSectionsProps> = ({ categories, view, onSelect }) => {
    // Determine which field to use based on the 'view' prop
    const uniqueItems = Array.from(
        new Set(
            categories
            .map(category => {
                if (view === "category") return category.section;
                if (view === "author") return category.byline;
                if (view === "source") return category.source;
                return null; // Handle unexpected cases
            })
            .filter(Boolean) as string[]
        )
    ).slice(0, 12); // Limit to 12 items

    return (
        <>
            {uniqueItems.length > 0 && (
                <ul className="categories-menu">
                    {uniqueItems.map((item) => (
                        <li key={item}>
                            <button className="category-link"  onClick={() => onSelect?.(item)}>{item}</button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default UniqueSections;
