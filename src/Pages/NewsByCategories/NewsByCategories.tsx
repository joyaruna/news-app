import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import "./NewsByCategories.scss";

interface Category {
  section?: string;
  byline?: string;
  source?: string;
}


function NewsByCategories() {
  const location = useLocation();
  const filteredCategories: Category[] = location.state?.filteredCategories || [];
  const selectedCategory = filteredCategories.length > 0 ? filteredCategories[0].section : "Unknown Category";

  return (
    <div className='main-container'>
      <Navbar />
      <h3 className="category-name">{selectedCategory} Stories</h3>
      <div className="custom-line"></div>
        {filteredCategories.map((category: Category, index: number) => (
          <FilteredCategory key={index} category={category} />
        ))}
      <Footer />
    </div>
  );
}

const FilteredCategory = ({ category }: any) => {
  return (
    <div className="categories-container">
      <span className="news-title">{category.title}</span>
      {category.multimedia && category.multimedia.length > 0 && (
        <img
          src={category.multimedia[0].url}
          alt={category.multimedia[0].caption || "News Image"}
          style={{
            width: "30%",
            maxWidth: "600px",
            height: "auto",
            borderRadius: "8px",
            marginBottom: "10px"
          }}
        />
      )}
      <span className="author-name">Author: {category.byline || "Unknown"}</span>
      <span className="author-name">Source: {category.section || "Unknown"}</span>
      <span className="news-description">{category.abstract}</span>
    </div>
  )
}

export default NewsByCategories;
