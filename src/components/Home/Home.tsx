import React, { useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "../../store";
import { getTrendingArticles, getTrendingNews } from "../../reducers/NewsSlice";
import "./Home.scss"; // Import the CSS file
import { useScreenSize } from "../../utils/useScreenSize";
import { FaNewspaper } from "react-icons/fa";

// Define the structure of an article/news item
interface News {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    content: string;
}

// Define props for child components
interface AllTrendingNewsProps {
    trendingNews: News[];
}

interface TrendingNewsProps {
    news: News;
}

interface ArticlesSectionProps {
    trendingArticles: News[];
}

interface TrendingArticlesProps {
    trendingArticles: News[];
}

interface TrendingArticleProps {
    article: News;
}

const Home: React.FC = () => {
    const isMobile = useScreenSize();
    const dispatch = useAppDispatch();
    const { trendingNews, trendingArticles } = useTypedSelector((state) => state.news);

    useEffect(() => {
        dispatch(getTrendingNews());
        dispatch(getTrendingArticles());
    }, [dispatch]);

    console.log(trendingArticles, 'here');
    console.log(trendingNews, 'down');

    return (
        <div className={isMobile ? "home-mobile-container" : "home-container"}>
            <AllTrendingNews trendingNews={trendingNews} />
            <ArticlesSection trendingArticles={trendingArticles} />
        </div>
    );
};

const AllTrendingNews: React.FC<AllTrendingNewsProps> = ({ trendingNews }) => {
    return (
        <div className="all-trending-news">
            {trendingNews.map((news, i) => (
                <TrendingNews key={i} news={news} />
            ))}
        </div>
    );
};

const TrendingNews: React.FC<TrendingNewsProps> = ({ news }) => {
    return (
        <div className="trending-news-container">
            <span className="news-title">{news.title}</span>
            {news.urlToImage && (
                <img
                    src={news.urlToImage}
                    alt={news.title}
                    style={{ width: "100%", maxWidth: "600px", height: "auto", borderRadius: "8px" }}
                />
            )}
            <span className="author-name">Author: {news.author || "Unknown"}</span>
            <span className="author-name">Source: {news.source.name}</span>
            <span className="news-description">{news.description} Read more.....</span>
        </div>
    );
};

const ArticlesSection: React.FC<ArticlesSectionProps> = ({ trendingArticles }) => {
    return (
        <div className="articles-section">
            <div className="title-container">
                <FaNewspaper size={20} />
                <span className="main-title">Trending Articles </span>
            </div>
            <TrendingArticles trendingArticles={trendingArticles} />
        </div>
    );
};

const TrendingArticles: React.FC<TrendingArticlesProps> = ({ trendingArticles }) => {
    return (
        <div className="all-trending-articles">
            {trendingArticles.map((article, i) => (
                <TrendingArticle key={i} article={article} />
            ))}
        </div>
    );
};

const TrendingArticle: React.FC<TrendingArticleProps> = ({ article }) => {
    return (
        <div className="trending-article-container">
            <span className="article-title">{article.title}</span>
            {article.urlToImage && (
                <img
                    src={article.urlToImage}
                    alt={article.title}
                    style={{ width: "100%", maxWidth: "600px", height: "auto", borderRadius: "8px" }}
                />
            )}
            <span className="author-name">Source: {article.source.name}</span>
            <span className="news-description">{article.description} Read more.....</span>
        </div>
    );
};

export default Home;
