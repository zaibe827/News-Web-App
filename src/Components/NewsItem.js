import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl } = this.props
        return (
            <div className='my-3'>
                                 {/*className='card' style={{width: "18rem"}} */}
                <div className="card" >
                    {/* if image URL is null run the default URL */}
                    <img src={!imageUrl?"https://www.livemint.com/lm-img/img/2023/07/29/600x338/US_China_Taiwan_Weapons_1690621942541_1690621942849.jpg":imageUrl} className="card-img-top" alt="Unalbe to load" />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
