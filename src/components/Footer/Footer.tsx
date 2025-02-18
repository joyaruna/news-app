import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer: React.FC = () => {
    return (
        <div className="footer-container">
            <div className="sub-container">
                <div className="menu-container">
                    <span className="menu-header">About & Contact</span>
                    <ul className="footer-menu">
                        <li><Link to="/" className="menu-link">About Us</Link></li>
                        <li><Link to="/" className="menu-link">Contact Us</Link></li>
                        <li><Link to="/" className="menu-link">Editorial Team</Link></li>
                    </ul>
                </div>
                <div className="menu-container">
                    <span className="menu-header">Quick Links</span>
                    <ul className="footer-menu">
                        <li><Link to="/" className="menu-link">Popular Articles</Link></li>
                        <li><Link to="/" className="menu-link">Archives</Link></li>
                        <li><Link to="/" className="menu-link">Subscribe</Link></li>
                    </ul>
                </div>
                <div className="menu-container">
                    <span className="menu-header">Legal & Policies</span>
                    <ul className="footer-menu">
                        <li><Link to="/" className="menu-link">Terms of Service</Link></li>
                        <li><Link to="/" className="menu-link">Privacy Policy</Link></li>
                        <li><Link to="/" className="menu-link">Editorial Guidelines</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
