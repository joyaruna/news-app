import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useScreenSize } from "../../utils/useScreenSize";
import { motion } from "framer-motion";
import "./Navbar.scss"; // Import the CSS file

const Navbar: React.FC = () => {
    const isMobile = useScreenSize();
    const [isOpen, setIsOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [sourceOpen, setSourceOpen] = useState(false);
    const [authorOpen, setauthorOpen] = useState(false);

  

    const viewCategories = () => {
        setCategoryOpen((!categoryOpen))
        setSourceOpen(false)
        setauthorOpen(false)
    }
    const viewSources = () => {
        setSourceOpen((!sourceOpen))
        setCategoryOpen(false)
        setauthorOpen(false)
    }
    const viewAuthors = () => {
        setauthorOpen((!authorOpen))
        setCategoryOpen(false)
        setSourceOpen(false)
    }


    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <img src="/images/logo.png" alt="logo" className="brand-logo" />
                </Link>

                {/* brand tagline */}
                {isMobile ?
                    <motion.div
                        className="brand-tagline"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    >NewsPulse
                    </motion.div>
                    :
                    <motion.div
                        className="brand-tagline"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    >
                        NewsPulse – Breaking Stories, Beating Fast. 🚀
                    </motion.div>
                }

                {/* Mobile Menu Button */}
                {isMobile ? (
                    <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? "✖" : "☰"}
                    </button>
                ) : (
                    <>
                        <ul className="nav-links">
                            <li><Link to="/" className="nav-link">Home</Link></li>
                            <li><button className="nav-link" onClick={viewCategories}>Categories</button></li>
                            <li><button className="nav-link" onClick={viewSources}>Sources</button></li>
                            <li><button className="nav-link-last" onClick={viewAuthors}>Authors</button></li>
                        </ul>

                        {/* Keyword search */}
                        <div className="search-container">
                            <FaSearch color="#fff" />
                            <input
                                id='search'
                                type="text"
                                className='search-box'
                                placeholder="search by keyword"
                            />
                        </div>

                        {/* Filter by date */}
                        <Link to="/" className="filter-container">
                            <FaFilter color="#fff" />
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
            {/* categories */}
            {categoryOpen && (
                <ul className="mobile-menu">
                    <li><Link to="/" className="mobile-menu-link">Sport</Link></li>
                    <li><Link to="/about" className="mobile-menu-link">Entertainment</Link></li>
                    <li><Link to="/services" className="mobile-menu-link">Politics</Link></li>
                    <li><Link to="/contact" className="mobile-menu-link">All</Link></li>
                </ul>
            )}
            {/* sources */}
            {sourceOpen && (
                <ul className="mobile-menu">
                    <li><Link to="/" className="mobile-menu-link">Sport</Link></li>
                    <li><Link to="/about" className="mobile-menu-link">Entertainment</Link></li>
                    <li><Link to="/services" className="mobile-menu-link">Politics</Link></li>
                    <li><Link to="/contact" className="mobile-menu-link">All</Link></li>
                </ul>
            )}
            {/* authors */}
            {authorOpen && (
                <ul className="mobile-menu">
                    <li><Link to="/" className="mobile-menu-link">Sport</Link></li>
                    <li><Link to="/about" className="mobile-menu-link">Entertainment</Link></li>
                    <li><Link to="/services" className="mobile-menu-link">Politics</Link></li>
                    <li><Link to="/contact" className="mobile-menu-link">All</Link></li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
