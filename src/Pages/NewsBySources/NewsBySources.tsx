import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import { Category } from '../../utils/sourceTypes';
import "./NewsBySources.scss";


function NewsBySources() {
    const location = useLocation();
    const filteredSourceItems: Category[] = location.state?.filteredSourceItems || [];

    const selectedSource = filteredSourceItems.length > 0
        ? typeof filteredSourceItems[0].source === "object"
            ? filteredSourceItems[0].source.name // Use name if source is an object
            : filteredSourceItems[0].source
        : "Unknown Source";

    return (
        <div className='main-container'>
            <Navbar />
            <h3 className="category-name">Stories from {selectedSource}</h3>
            <div className="custom-line"></div>
            {filteredSourceItems.map((category: Category, index: number) => (
                <FilteredCategory key={index} category={category} />
            ))}
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
