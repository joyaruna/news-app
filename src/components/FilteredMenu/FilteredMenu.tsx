import React from "react";
import { Category } from "../../utils/categoryTypes";
import "./FilteredMenu.scss";

interface FilteredMenuProps {
  category: Category;
}

const FilteredMenu: React.FC<FilteredMenuProps> = ({ category }) => {
  return (
    <div className="categories-container">
      <span className="news-title">{category.title}</span>

      {category.multimedia && category.multimedia.length > 0 && (
        <img
          src={category.multimedia[0].url}
          alt={category.multimedia[0].caption || "News Image"}
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "auto",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        />
      )}

      <span className="author-name">Author: {category.byline || "Unknown"}</span>
      <span className="author-name">Source: {category.section || "Unknown"}</span>
      <span className="news-description">{category.abstract}</span>
    </div>
  );
};

export default FilteredMenu;
