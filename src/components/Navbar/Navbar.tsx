import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useScreenSize } from "../../utils/useScreenSize";
import { motion } from "framer-motion";
import "./Navbar.scss";
import { useAppDispatch, useTypedSelector } from "../../store";
import { getCategories, getSources } from "../../reducers/NewsSlice";
import UniqueSections from "../UniqueCategories/UniqueCategories";

interface Category {
    section?: string;
    byline?: string;
    source?: string;
}

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isMobile: boolean = useScreenSize();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
    const [sourceOpen, setSourceOpen] = useState<boolean>(false);
    const [authorOpen, setAuthorOpen] = useState<boolean>(false);
    const { categories } = useTypedSelector((state) => state.news);
    const source = useTypedSelector((state) => state.news.source);
    // console.log('tthis is source', source)
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
    const [filteredAuthors, setFilteredAuthors] = useState<Category[]>([]);
    console.log(filteredCategories, filteredAuthors)


    const viewCategories = () => {
        setCategoryOpen(!categoryOpen);
        setSourceOpen(false);
        setAuthorOpen(false);
    };

    const viewSources = () => {
        setSourceOpen(!sourceOpen);
        setCategoryOpen(false);
        setAuthorOpen(false);
    };

    const viewAuthors = () => {
        setAuthorOpen(!authorOpen);
        setCategoryOpen(false);
        setSourceOpen(false);
    };
    const returnToHome = () => {
        setAuthorOpen(false);
        setCategoryOpen(false);
        setSourceOpen(false);
        navigate("/"); // Navigate back to home
    };


    const handleCategorySelect = (selectedItem: string) => {
        const filteredItems = categories.filter(category => category.section === selectedItem);
        setFilteredCategories(filteredItems);
        navigate("/categories", { state: { filteredCategories: filteredItems } });
    };

    const handleAuthorSelect = (selectedItem: string) => {
        console.log('clicked')
        const filteredItems = categories.filter(category => category.byline === selectedItem);
        setFilteredAuthors(filteredItems);
        navigate("/authors", { state: { filteredAuthorItems: filteredItems } });
        console.log("Filtered Items:", filteredItems);
    };


    useEffect(() => {
        dispatch(getCategories());
        dispatch(getSources());
    }, [dispatch]);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <img src="/images/logo.png" alt="logo" className="brand-logo" />
                </Link>

                {/* Brand tagline */}
                <motion.div
                    className="brand-tagline"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                    {isMobile ? "NewsPulse" : "NewsPulse – Breaking Stories, Beating Fast. 🚀"}
                </motion.div>

                {/* Mobile Menu Button */}
                {isMobile ? (
                    <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? "✖" : "☰"}
                    </button>
                ) : (
                    <>
                        <ul className="nav-links">
                            <li><button className="nav-link" onClick={returnToHome}>Home</button></li>
                            <li><button className="nav-link" onClick={viewCategories}>Categories</button></li>
                            <li><button className="nav-link" onClick={viewSources}>Sources</button></li>
                            <li><button className="nav-link-last" onClick={viewAuthors}>Authors</button></li>
                        </ul>

                        {/* Keyword search */}
                        <div className="search-container">
                            <FaSearch color="#fff" size={12} />
                            <input
                                id="search"
                                type="text"
                                className="search-box"
                                placeholder="Search by keyword"
                            />
                        </div>

                        {/* Filter by date */}
                        <Link to="/" className="filter-container">
                            <FaFilter color="#fff" size={10} />
                            <span className="filter-link">Filter by date</span>
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Menu */}
            {isMobile && isOpen && (
                <ul className="mobile-menu">
                    <li><Link to="/" className="mobile-menu-link">Home</Link></li>
                    <li><Link to="/about" className="mobile-menu-link">About</Link></li>
                    <li><Link to="/services" className="mobile-menu-link">Services</Link></li>
                    <li><Link to="/contact" className="mobile-menu-link">Contact</Link></li>
                </ul>
            )}

            {/* Dynamic Menus */}
            {categoryOpen && <UniqueSections categories={categories} view="category" onSelect={handleCategorySelect} />}
            {sourceOpen && <UniqueSections categories={source} view="source" />}
            {authorOpen && <UniqueSections categories={categories} view="author" onSelect={handleAuthorSelect} />}
        </nav>
    );
};


export default Navbar;
