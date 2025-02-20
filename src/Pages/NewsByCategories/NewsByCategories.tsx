import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FilteredMenu from "../../components/FilteredMenu/FilteredMenu";
import { Category } from "../../utils/categoryTypes";
import "./NewsByCategories.scss";
import SearchBar from "../../components/SearchBar/SearchBar";

const NewsByCategories: React.FC = () => {
  const location = useLocation();
  const filteredCategories: Category[] = location.state?.filteredCategories || [];
  const selectedCategory = filteredCategories.length > 0 ? filteredCategories[0].section : "Unknown Category";
  const [searchQuery, setSearchQuery] = useState("");
  // Filter news based on search input
  const filteredNews = filteredCategories.filter((category) =>
    category.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-container">
      <Navbar />
      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <h3 className="category-name">{selectedCategory} Stories</h3>
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
};

export default NewsByCategories;
