import React from "react";
import PropTypes from "prop-types";

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
  const handleImageError = (imgError) => {
    imgError.target.src = "https://blog.flamingtext.com/blog/2023/12/07/flamingtext_com_1701954324_894068007.png";
  };

  return (
    <>
      <div className="my-3">
        <div className="card">
          <span className="position-absolute top-0 badge bg-primary" style={{ fontSize: "14px" }}>
            {source}
          </span>
          <img
            src={imageUrl}
            onError={handleImageError}
            className="card-img-top"
            alt=""
            width={"300px"}
            height={"200px"}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                <span className="fw-bold">Author: </span>
                {author} <span className="fw-bold">Date: </span>
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

NewsItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  newsUrl: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
};

export default NewsItem;
