//import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
 // Link
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API;
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        height={5}
        color='#f11946'
        progress={this.state.progress}
        //onLoaderFinished={() => setProgress(0)}
      />
       
        <Switch>
          <Route exact path="/">
          <News setProgress={this.setProgress} apiKey={this.apiKey} category="news" key="news"/>
          </Route>
          <Route exact path="/business">
          <News setProgress={this.setProgress} apiKey={this.apiKey} category="business" key="business"/>
          </Route>
          <Route exact path="/sports">
          <News setProgress={this.setProgress} apiKey={this.apiKey} category="sport" key="sport"/>
          </Route>
          <Route exact path="/energy">
          <News setProgress={this.setProgress} apiKey={this.apiKey} category="energy" key="energy"/>
          </Route>
          <Route exact path="/entertainment">
          <News setProgress={this.setProgress} apiKey={this.apiKey} category="entertainment" key="entertainment"/>
          </Route>
          <Route exact path="/technology">
          <News setProgress={this.setProgress} apiKey={this.apiKey} category="tech" key="tech"/>
          </Route>
         
        </Switch>
        </Router>
      </div>
    )
  }
}


