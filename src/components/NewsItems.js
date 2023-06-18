import React, { Component } from 'react'

export class NewsItems extends Component {
    render() {
        let {title,description,imageurl,newsurl,newstime,author}=this.props;
        return (
            <div>
                <div className="card my-3" style={{width:"18rem" }}>
                    <img src={imageurl} className="card-img-top" alt="newsdisplay"/>
                    <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {author} on {new Date(newstime).toGMTString()} </small></p>
                    <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItems



                                     //BUTTTAD NATH