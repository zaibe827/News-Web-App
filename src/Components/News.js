import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types' //impt


export default class News extends Component {

    
    static defaultProps={
        conutry:'in',
        pageSize:8,
        category:'general',
    }

    static propTypes={ 
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
        
    }

    constructor() {
        super();
        this.state = {
            // articles: this.articles,
            articles: [],
            loading: false,
            page: 1
        }
    }

    //CMD function run right after the render function
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=61bb4eff58f04825bae8e273bdfbd3a7&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url)
        let parsedData = await data.json()
        // console.log(parsedData)
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false });
    }

    handlePrevClick = async () => {
        console.log("Previous")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=61bb4eff58f04825bae8e273bdfbd3a7&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({ articles: parsedData.articles });

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading:false
        })
    }

    handleNextClick = async () => {
        console.log("Next")
        //once size reached the next button won't work
        //Math.ceil : give next biggest integer
        //20 is total size of articles
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=61bb4eff58f04825bae8e273bdfbd3a7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            // console.log(parsedData)
           
            this.setState({ articles: parsedData.articles });

            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                 // when data is loaded the loading become false
                loading:false
            })
        }
    }

    render() {
        return (
            <div>

                <div className="container my-3">
                    <h2 className="text-center" style={{margin:'35px 0px'}}>IdealNews - TopHeadlines</h2>
                    {/* if this.state.loading is true show Spinner otherwise don't show Spinner */}
                    {this.state.loading && <Spinner/>} 
                    <div className="row">
                        {/* if this.state.loading is false then show the above content  */}
                        {!this.state.loading && this.state.articles.map((element) => {
                            // key is the unique element
                            return <div className="col-md-4" key={element.url}>
                                {/* slice(0,45)  only take first 45 charaacters for showing, so that all of our cards text and title look good and equal */}
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                            </div>
                        })}
                    </div>
                </div>

                <div className="container d-flex justify-content-between">

                    <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} type="button" className="btn btn-dark"> &larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} type="button" className="btn btn-dark">Next &rarr;</button>
                </div>
            </div>
        )
    }
}
