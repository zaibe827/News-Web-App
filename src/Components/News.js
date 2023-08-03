import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types' //impt
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const UpdateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url)
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        // console.log(parsedData)
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
         document.title = `${capitalizeFirstLetter(props.category)} - IdealNews`
        UpdateNews();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
      
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        const nextPage = page + 1; // Increment the page number
        try {
            let data = await fetch(url);
            let parsedData = await data.json();
            setArticles(articles.concat(parsedData.articles));
            setTotalResults(parsedData.totalResults);
            setPage(nextPage);
        } catch (error) {
            console.error("Error fetching more data:", error);
            setLoading(false);
        }
    };



    return (
        <>


            <h2 className="text-center" style={{ margin: '35px 0px',marginTop:'90px' }}>IdealNews - Top {capitalizeFirstLetter(props.category)} Headlines</h2>

            {/* if loading is true show Spinner otherwise don't show Spinner */}
            {loading && <Spinner />}
            {/* Remove spinner in updated updated version */}

            {/* infinite scroll : docs: 'infinite scroll component' */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
            {/* <InfiniteScroll
                dataLength={articles ? articles.length : 0}
                next={fetchMoreData}
                hasMore={articles && articles.length !== totalResults}
                loader={<Spinner />}
            > */}


                <div className="container">

                    <div className="row">
                        {/* if loading is false then show the above content  */}
                        {/* {!loading && articles.map((element) => {  */}
                        {/* remove loading in updated version for infinite scroll*/}

                        {articles.map((element, index) => {
                            // key is the unique element
                            return <div className="col-md-4" key={index}>
                                {/* slice(0,45)  only take first 45 characters for showing, so that all of our cards text and title look good and equal */}
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

        </>
    )

}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,

}

export default News
