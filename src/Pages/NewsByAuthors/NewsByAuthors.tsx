import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import "./NewsByAuthors.scss";
import FilteredMenu from '../../components/FilteredMenu/FilteredMenu';
import { Category } from '../../utils/categoryTypes';
import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';


function NewsByAuthors() {
    const location = useLocation();
    const filteredAuthorItems: Category[] = location.state?.filteredAuthorItems || [];
    const selectedAuthor = filteredAuthorItems.length > 0 ? filteredAuthorItems[0].byline : "Unknown Author";
    const [searchQuery, setSearchQuery] = useState("");
    // Filter news based on search input
    const filteredNews = filteredAuthorItems.filter((category) =>
        category.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='main-container'>
            <Navbar />
            {/* Search Bar */}
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <h3 className="category-name">Stories {selectedAuthor}</h3>
            <div className="custom-line"></div>

            {/* Display filtered results */}
            {filteredNews.length > 0 ? (
                filteredNews.map((category, index) => <FilteredMenu key={index} category={category} />)
            ) : (
                <p>No matching news found.</p>
            )}
            <Footer />
        </div>
    );
}

export default NewsByAuthors;
