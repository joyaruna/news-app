import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import "./NewsByAuthors.scss";
import FilteredMenu from '../../components/FilteredMenu/FilteredMenu';
import { Category } from '../../utils/categoryTypes';


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
                <FilteredMenu key={index} category={category} />
            ))}
            <Footer />
        </div>
    );
}

export default NewsByAuthors;
