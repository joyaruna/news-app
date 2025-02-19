import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import "./NewsByAuthors.scss";

interface Category {
    section?: string;
    byline?: string;
    source?: string;
}



function NewsByAuthors() {
    const location = useLocation();

    const filteredAuthorItems: Category[] = location.state?.filteredAuthorItems || [];
    const selectedAuthor = filteredAuthorItems.length > 0 ? filteredAuthorItems[0].byline : "Unknown Author";

    return (
        <div className='main-container'>
            <Navbar />
            <h3 className="category-name">Stories {selectedAuthor}</h3>
            <div className="custom-line"></div>
            {filteredAuthorItems.map((category: Category, index: number) => (
                <FilteredCategory key={index} category={category} />
            ))}
            <Footer />
        </div>
    );
}

const FilteredCategory = ({ category }: any) => {
    return (
        <div className="authors-container">
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

export default NewsByAuthors;
