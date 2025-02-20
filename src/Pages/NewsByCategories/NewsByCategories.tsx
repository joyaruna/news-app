import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import "./NewsByCategories.scss";
import FilteredMenu from '../../components/FilteredMenu/FilteredMenu';
import { Category } from '../../utils/categoryTypes';


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
          <FilteredMenu key={index} category={category} />
        ))}
      <Footer />
    </div>
  );
}



export default NewsByCategories;
