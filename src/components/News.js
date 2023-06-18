import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: 'in',
        category: 'news'

    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
    }

    constructor(props) {
        super(props);
        // console.log("Hello I am form news component ");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = this.props.category + " -NewsMonkey";
    }
    async updatenews() {
        this.props.setProgress(0);
        let url = `https://api.newscatcherapi.com/v2/latest_headlines?countries=IN&topic=${this.props.category}&page=${this.state.page}&page_size=10&lang=en`;
        // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=10`;

        this.setState({ loading: true });
        // let data=await fetch(url);
        let data = await fetch(url, { method: 'GET', headers: { 'x-api-key': this.props.apiKey } });
        this.props.setProgress(30);
        let parsedata = await data.json();
        this.props.setProgress(60);
        console.log(parsedata);
        this.setState({
            articles: parsedata.articles,
            loading: false,
            totalResults: parsedata.total_hits,
        })
        this.props.setProgress(100);
    }
    fetchMoreData = async () => {
        // console.log("hellobdcjb bdhjcb");
        //console.log("artcles",this.state.articles.length)
        //console.log("length",this.state.length)
        this.props.setProgress(0);
        this.setState({ page: this.state.page + 1 });
        // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=10`;
        let url = `https://api.newscatcherapi.com/v2/latest_headlines?countries=IN&topic=${this.props.category}&page=${this.state.page}&page_size=10&lang=en`;
        this.setState({ loading: true });
        let data = await fetch(url, { method: 'GET', headers: { 'x-api-key': this.props.apiKey } });
        //let data = await fetch(url);
        this.props.setProgress(30);
        let parsedata = await data.json();
        this.props.setProgress(60);
        // console.log(parsedata);
        this.setState({
            articles: this.state.articles.concat(parsedata.articles),
            loading: false,
            // totalResults: parsedata.totalResults,
            totalResults: parsedata.total_hits,
            length: parsedata.articles.length
        });
        this.props.setProgress(100);

    };
    // handleprevclick = async () => {

    //     // console.log("previous click");
    //     // let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=a3e2ccbf6c574c9799a9f6f1d3f4f4b1&page=${this.state.page-1}&pageSize=20`;
    //     // this.setState({loading:true});
    //     // let data=await fetch(url);
    //     // let parsedata=await data.json();
    //     // console.log(parsedata);
    //     this.setState({
    //         // articles:parsedata.articles,
    //         page: this.state.page - 1,
    //         //loading:false
    //     })
    //     setTimeout(() => {
    //         this.updatenews();
    //     }, 1000)

    //}
    // handlenextclick = async () => {
    //     // console.log("next click");

    //     // let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=a3e2ccbf6c574c9799a9f6f1d3f4f4b1&page=${this.state.page+1}&pageSize=20`;
    //     // this.setState({loading:true});
    //     // let data=await fetch(url);
    //     // let parsedata=await data.json();
    //     // console.log(parsedata);
    //     this.setState({
    //         //articles:parsedata.articles,
    //         page: this.state.page + 1,
    //         //loading:false
    //     })
    //     setTimeout(() => {
    //         this.updatenews();
    //     }, 1000)
    // }
    async componentDidMount() {
        //     // let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=a3e2ccbf6c574c9799a9f6f1d3f4f4b1&page=1&pageSize=20`;
        //     // this.setState({loading:true});
        //     // let data=await fetch(url);
        //     // let parsedata=await data.json();
        //     // console.log(parsedata);
        //     // this.setState({
        //     //     articles:parsedata.articles,
        //     //     loading:false
        //     // })
        this.updatenews();



    }
    render() {
        return (
            <>

                <h1 className="text-center my-5" style={{ padding: "20px 0px" }}>NewsMonkey- Top Headlines</h1>

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}

                    hasMore={this.state.length !== 0}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">

                            {this.state.articles.map((element) => {
                                // console.log("bjdbjc");
                                return <div className="col-md-4" key={element.link}>
                                    <NewsItems title={element.title ? element.title : " "} description={element.excerpt ? element.excerpt : " "} imageurl={element.media ? element.media : "news.jpg"} newsurl={element.link} newstime={element.published_date} author={element.author ? element.author : "Unknown"} />
                                </div>
                            })}


                        </div>

                    </div>
                </InfiniteScroll>
                {/* <div className="container my-3 d-flex justify-content-between">
                    <button type="button" className="btn btn-dark mx-3" onClick={this.handleprevclick} disabled={this.state.page <= 1}>&larr; Previous</button>
                    <button type="button" className="btn btn-dark mx-3" onClick={this.handlenextclick} disabled={this.state.page >= 4}>Next &rarr;</button>
                </div> */}


            </>
        )
    }
}

export default News
