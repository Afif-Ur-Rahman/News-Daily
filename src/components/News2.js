import React, { useState, useEffect } from "react";
import Navbar2 from "./Navbar2";
import NewsItem from "./NewsItem";
import LoadingBar from "react-top-loading-bar";
import PropTypes from "prop-types";

const News2 = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(props.category);
  const [totalResults, setTotalResults] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchNews();
  }, [category, page]);

  const fetchNews = async () => {
    setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    setProgress(50);
    let parsedData = await data.json();
    setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setProgress(100);
    document.title = `News Daily - ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  const handlePrevClick = async () => {
    if (page > 1) {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page - 1}&pagesize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(parsedData.articles);
      setPage(page - 1);
      setLoading(false);
    }
  };

  const handleNextClick = async () => {
    if (page + 1 <= Math.ceil(totalResults / props.pageSize)) {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(parsedData.articles);
      setPage(page + 1);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar2 onCategoryChange={handleCategoryChange} />
      <LoadingBar height={4} color="#f11946" progress={progress} />
      <div className="container my-5">
        <h2 style={{marginTop: "70px"}}>
          News Daily - Top {category.charAt(0).toUpperCase() + category.slice(1)} Headlines
        </h2>
        <div className="row">
          {!loading &&
            articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={
                    element.title
                      ? element.title.length <= 40
                        ? element.title
                        : element.title.slice(0, 40) + "..."
                      : ""
                  }
                  description={
                    element.description
                      ? element.description.length <= 80
                        ? element.description
                        : element.description.slice(0, 80) + "..."
                      : ""
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://blog.flamingtext.com/blog/2023/12/07/flamingtext_com_1701954324_894068007.png"
                  }
                  newsUrl={element.url}
                  author={element.author ? element.author : "Unknown"}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={page <= 1}
            className="btn btn-primary"
            onClick={handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
            className="btn btn-primary"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </>
  );
};

News2.defaultProps = {
  country: "us",
  pageSize: 21,
  category: "general",
};

News2.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
};

export default News2;
