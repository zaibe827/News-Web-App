import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props
        return (
            <div className='my-3'>
                {/*className='card' style={{width: "18rem"}} */}
                <div className="card" >
                    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                        <span className="badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>  {source}   </span>
                    </div>

                    {/* if image URL is null run the default URL */}
                    <img src={!imageUrl ? "https://www.livemint.com/lm-img/img/2023/07/29/600x338/US_China_Taiwan_Weapons_1690621942541_1690621942849.jpg" : imageUrl} className="card-img-top" alt="Unalbe to load" />
                    <div className="card-body">
                        <h5 className="card-title">{title}  </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
