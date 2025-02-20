import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.scss";



const SearchBar: React.FC<{ searchQuery: string; onSearchChange: (value: string) => void }> = ({ searchQuery, onSearchChange }) => (
    <div className="search-container">
        <FaSearch color="#080c67" size={16} />
        <input
            type="text"
            className="search-box"
            placeholder="Search news by keyword..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
        />
    </div>
);
export default SearchBar;
