import React from "react";
import { Link } from "react-router-dom";
import "./UniqueCategories.scss";

interface Category {
    section?: string;
    byline?: string;
    source?: string;
}

interface UniqueSectionsProps {
    categories: Category[];
    view: "category" | "author" | "source"; // Determines what to display
}

const UniqueSections: React.FC<UniqueSectionsProps> = ({ categories, view }) => {
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
                .filter(Boolean) // Remove undefined or null values
        )
    ).slice(0, 12); // Limit to 12 items

    return (
        <>
            {uniqueItems.length > 0 && (
                <ul className="categories-menu">
                    {uniqueItems.map((item) => (
                        <li key={item}>
                            <Link to="/services" className="category-link">{item}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default UniqueSections;
