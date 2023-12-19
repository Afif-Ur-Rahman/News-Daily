import React, { Component } from "react";
import Navbar2 from "./Navbar2";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

export class News2 extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 21,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      category: this.props.category,
      totalResults: 0,
    };
  }

  async fetchNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.state.category}&apiKey=0e472b03a49f4ebbb35b9e58a4095caf&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    document.title =
      "News Daily - " +
      this.state.category.toUpperCase().slice(0, 1) +
      this.state.category.slice(1);
  }

  componentDidMount() {
    this.fetchNews();
  }

  handleCategoryChange = (category) => {
    // Update the state with the new category and trigger a fetch
    this.setState({ category, page: 1 }, this.fetchNews);
  };

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.state.category}&apiKey=0e472b03a49f4ebbb35b9e58a4095caf&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });

  }

  render() {
    return (
      <>
        <Navbar2 onCategoryChange={this.handleCategoryChange} />
        <div className="container my-3">
          <h2>
            News Daily - Top
            {this.state.category.toUpperCase().slice(0, 1) +
              this.state.category.slice(1)}
            Headlines
          </h2>

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Loader />}
          >
            <div className="row">
              {this.state.articles.map((element, index) => {
                return (
                  <div className="col-md-4" key={index}>
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
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

export default News2;
