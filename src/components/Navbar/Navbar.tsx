import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useScreenSize } from "../../utils/useScreenSize";
import { motion } from "framer-motion";
import "./Navbar.scss";
import { useAppDispatch, useTypedSelector } from "../../store";
import { getCategories, getTrendingNews } from "../../reducers/NewsSlice";
import UniqueSections from "../UniqueCategories/UniqueCategories";
import { Category } from "../../utils/categoryTypes";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isMobile = useScreenSize();
    const { categories, trendingNews } = useTypedSelector((state) => state.news);
    const [filteredItems, setFilteredItems] = useState<Category[]>([]);
    const [menuState, setMenuState] = useState({
        isOpen: false,
        activeMenu: "",
    });

    const toggleMenu = (menu: "category" | "source" | "author") => {
        setMenuState((prev) => ({
            isOpen: false,
            activeMenu: prev.activeMenu === menu ? "" : menu,
        }));
    };

    // Navigate back to home and close menus
    const returnToHome = () => {
        setMenuState({ isOpen: false, activeMenu: "" });
        navigate("/");
    };

    const handleSelect = (selectedItem: string, type: "category" | "author" | "source") => {
        let filtered: Category[] = [];

        if (type === "category") {
            filtered = categories.filter((item) => item.section === selectedItem);
            navigate("/categories", { state: { filteredCategories: filtered } });
        } else if (type === "author") {
            filtered = categories.filter((item) => item.byline === selectedItem);
            navigate("/authors", { state: { filteredAuthorItems: filtered } });
        } else if (type === "source") {
            filtered = trendingNews.filter((item) => {
                const sourceName = typeof item.source === "object" ? item.source.name : item.source;
                return sourceName === selectedItem;
            });
            navigate("/sources", { state: { filteredSourceItems: filtered } });
        }

        setFilteredItems(filtered);
    };

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getTrendingNews());
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
                    <button className="menu-button" onClick={() => setMenuState({ isOpen: !menuState.isOpen, activeMenu: "" })}>
                        {menuState.isOpen ? "✖" : "☰"}
                    </button>
                ) : (
                    <>
                        <ul className="nav-links">
                            <li><button className="nav-link" onClick={returnToHome}>Home</button></li>
                            <li><button className="nav-link" onClick={() => toggleMenu("category")}>Categories</button></li>
                            <li><button className="nav-link" onClick={() => toggleMenu("source")}>Sources</button></li>
                            <li><button className="nav-link-last" onClick={() => toggleMenu("author")}>Authors</button></li>
                        </ul>

                        {/* Search Box */}
                        <div className="search-container">
                            <FaSearch color="#fff" size={12} />
                            <input id="search" type="text" className="search-box" placeholder="Search by keyword" />
                        </div>

                        {/* Filter by Date */}
                        <Link to="/" className="filter-container">
                            <FaFilter color="#fff" size={10} />
                            <span className="filter-link">Filter by date</span>
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Menu */}
            {isMobile && menuState.isOpen && (
                <ul className="mobile-menu">
                    <li><button className="mobile-menu-link" onClick={returnToHome}>Home</button></li>
                    <li><button className="mobile-menu-link" onClick={() => toggleMenu("category")}>Categories</button></li>
                    <li><button className="mobile-menu-link" onClick={() => toggleMenu("source")}>Sources</button></li>
                    <li><button className="mobile-menu-link" onClick={() => toggleMenu("author")}>Authors</button></li>
                </ul>
            )}

            {/* Dynamic Desktop Menus */}
            {menuState.activeMenu === "category" && (
                <UniqueSections categories={categories} view="category" onSelect={(item) => handleSelect(item, "category")} />
            )}
            {menuState.activeMenu === "source" && (
                <UniqueSections categories={trendingNews} view="source" onSelect={(item) => handleSelect(item, "source")} />
            )}
            {menuState.activeMenu === "author" && (
                <UniqueSections categories={categories} view="author" onSelect={(item) => handleSelect(item, "author")} />
            )}
        </nav>
    );
};

export default Navbar;
