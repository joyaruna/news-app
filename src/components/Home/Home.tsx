import React, { useEffect, useState } from "react";
import { useAppDispatch, useTypedSelector } from "../../store";
import { getCategories, getTrendingArticles, getTrendingNews } from "../../reducers/NewsSlice";
import "./Home.scss";
import { useScreenSize } from "../../utils/useScreenSize";
import { FaNewspaper } from "react-icons/fa";
import { News } from "../../utils/categoryTypes";

const Home: React.FC = () => {
    const isMobile = useScreenSize();
    const dispatch = useAppDispatch();
    const { trendingNews, trendingArticles } = useTypedSelector((state) => state.news);

    useEffect(() => {
        dispatch(getTrendingNews());
        dispatch(getTrendingArticles());
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <div className={isMobile ? "home-mobile-container" : "home-container"}>
            <AllTrendingNews trendingNews={trendingNews} />
            <ArticlesSection trendingArticles={trendingArticles} />
        </div>
    );
};

// Reusable NewsCard for News & Articles
interface NewsCardProps {
    news: News;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => setExpanded(!expanded);

    return (
        <div className="news-card">
            <span className="news-title">{news.title}</span>
            {news.urlToImage && (
                <img
                    src={news.urlToImage}
                    alt={news.title}
                    style={{ width: "100%", maxWidth: "600px", height: "auto", borderRadius: "8px" }}
                />
            )}
            {news.author && <span className="author-name">Author: {news.author}</span>}
            {news.source?.name && <span className="author-name">Source: {news.source.name}</span>}
            <span className="news-description">{expanded ? news.content : news.description}</span>
            <button onClick={toggleExpand} className="expand-button">
                {expanded ? "View Less" : "Read more..."}
            </button>
        </div>
    );
};

// All Trending News
const AllTrendingNews: React.FC<{ trendingNews: News[] }> = ({ trendingNews }) => (
    <div className="all-trending-news">
        {trendingNews.map((news, i) => (
            <NewsCard key={i} news={news} />
        ))}
    </div>
);

// Articles Section
const ArticlesSection: React.FC<{ trendingArticles: News[] }> = ({ trendingArticles }) => (
    <div className="articles-section">
        <div className="title-container">
            <FaNewspaper size={20} />
            <span className="main-title">Trending Articles</span>
        </div>
        <div className="all-trending-articles ">
        <AllTrendingNews trendingNews={trendingArticles} />
        </div>
    </div>
);

export default Home;
