import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import { Category } from '../../utils/sourceTypes';
import "./NewsBySources.scss";
import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';


function NewsBySources() {
    const location = useLocation();
    const filteredSourceItems: Category[] = location.state?.filteredSourceItems || [];
    const [searchQuery, setSearchQuery] = useState("");
    // Filter news based on search input
    const filteredNews = filteredSourceItems.filter((category) =>
        category.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const selectedSource = filteredSourceItems.length > 0
        ? typeof filteredSourceItems[0].source === "object"
            ? filteredSourceItems[0].source.name
            : filteredSourceItems[0].source
        : "Unknown Source";

    return (
        <div className='main-container'>
            <Navbar />
            {/* Search Bar */}
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <h3 className="category-name">Stories from {selectedSource}</h3>
            <div className="custom-line"></div>
            {/* Display filtered results */}
            {filteredNews.length > 0 ? (
                filteredNews.map((category, index) => <FilteredCategory key={index} category={category} />)
            ) : (
                <p>No matching news found.</p>
            )}
            <Footer />
        </div>
    );
}

const FilteredCategory = ({ category }: { category: Category }) => {
    const sourceName = typeof category.source === "object" ? category.source.name : category.source;

    return (
        <div className="categories-container">
            <span className="news-title">{category.title}</span>

            {category.urlToImage && (
                <img
                    src={category.urlToImage
                    }
                    alt={category.title}
                    style={{ width: "100%", maxWidth: "600px", height: "auto", borderRadius: "8px" }}
                />
            )}

            <span className="author-name">Author: {category.author || "Unknown"}</span>
            <span className="author-name">Source: {sourceName || "Unknown"}</span>
            <span className="news-description">{category.description}</span>
        </div>
    );
};

export default NewsBySources;
