import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types' //impt
import InfiniteScroll from "react-infinite-scroll-component";



export default class News extends Component {


    static defaultProps = {
        conutry: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,

    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            // articles: this.articles,
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - IdealNews`
    }

    async UpdateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=61bb4eff58f04825bae8e273bdfbd3a7&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url)
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        // console.log(parsedData)
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
        this.props.setProgress(100);
    }

    //CMD function run right after the render function
    async componentDidMount() {
        this.UpdateNews();  //calling the function
    }

    fetchMoreData = async () => {
        const nextPage = this.state.page + 1; // Increment the page number
    
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=61bb4eff58f04825bae8e273bdfbd3a7&page=${nextPage}&pageSize=${this.props.pageSize}`;
       
        try {
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults,
                page: nextPage, // Update the page number in the state
                
            });
        } catch (error) {
            console.error("Error fetching more data:", error);
            this.setState({ loading: false });
        }
    };
    

    //  {/* removed previous and next button after infinite scroll */}
    // handlePrevClick = async () => {
    //     this.setState({
    //         page: this.state.page - 1,
    //     })
    //     this.UpdateNews();
    // }

    //  {/* removed previous and next button after infinite scroll */}
    // handleNextClick = async () => {
    //     console.log("Next")

    //     //once size reached the next button won't work
    //     //Math.ceil : give next biggest integer
    //     //20 is total size of articles
    //     if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

    //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=61bb4eff58f04825bae8e273bdfbd3a7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    //         this.setState({ loading: true });
    //         let data = await fetch(url);
    //         let parsedData = await data.json();
    //         // console.log(parsedData)

    //         this.setState({ articles: parsedData.articles });

    //         this.setState({
    //             page: this.state.page + 1,
    //             articles: parsedData.articles,
    //             // when data is loaded the loading become false
    //             loading: false
    //         })


    //         // this.setState({
    //         //     page: this.state.page + 1,
    //         // })
    //         // this.UpdateNews();
    //     }
    // }

    render() {
        return (
            <>


                <h2 className="text-center" style={{ margin: '35px 0px' }}>IdealNews - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>

                {/* if this.state.loading is true show Spinner otherwise don't show Spinner */}
                {this.state.loading && <Spinner />}
                {/* Remove spinner in updated updated version */}

                {/* infinite scroll : docs: 'infinite scroll component' */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >

                    <div className="container">

                        <div className="row">
                            {/* if this.state.loading is false then show the above content  */}
                            {/* {!this.state.loading && this.state.articles.map((element) => {  */}
                            {/* remove loading in updated version for infinite scroll*/}

                            {this.state.articles.map((element, index) => {
                                // key is the unique element
                                return <div className="col-md-4" key={index}>
                                    {/* slice(0,45)  only take first 45 characters for showing, so that all of our cards text and title look good and equal */}
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>



                {/* removed previous and next button after infinite scroll */}
                {/* <div className="container d-flex justify-content-between">

                    <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} type="button" className="btn btn-dark"> &larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} type="button" className="btn btn-dark">Next &rarr;</button>
                </div> */}
            </>
        )
    }
}
