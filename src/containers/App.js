import '../stylesheet/basis.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import ArtistContainer from './artistContainer';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import FavoritesContainer from './FavoritesContainer';
import UserInput from '../components/UserInput';
import SpotifyFetch from '../components/SpotifyFetch';
import {getCurrentUser} from '../actions/addCurrentUser';
import { decodeToken } from "react-jwt";
import dandy from '../tokenSecret';
var jwt = require('jsonwebtoken');



const generateToken = (tokenVal) => {   // Takes the Parameter of an Access Token value & then creates a JWT
  var u = {
    spotify_token: tokenVal 
  }; 
  let jwtToken = jwt.sign(u, dandy)
    // expiresIn: 60 * 60 * 24 // expires in 24 hours
  //})
  return jwtToken
}

let tokenRet; 
let entireTok;


export const deco =  () => {              // If tokenRet has the fetched AccessToken value then decode the JWT & return just the Spotify Token value.
  if(tokenRet != null){
    const myDecodedToken = decodeToken(entireTok)
    
    return myDecodedToken.spotify_token
  }
}

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      artistsObjArr: [],
      logged_in: window.localStorage.getItem('access_token') !== null ? true : false
    }
  }
  
  
componentDidMount(){
  // if(this.state.logged_in === true){
  //   this.setState({ logged_in :false})}
  
  this.props.getCurrentUser()
  if(this.props.currentUser && !this.props.currentUser.error){
    this.tokenFetch()// Fetches & Sets the Token in a JWT into LocalStorage upon mounting 
  }
  
}

 tokenFetch = () => {
        fetch('http://localhost:8888/toke', {
          //credentials: "include",
          headers: {
          'Content-Type':'application/json',
          Accept:'application/json',
       }})
       .then(resp=> resp.json())
       .then(ressy=> {
         if(ressy.keys !== null ){
        tokenRet = ressy.token
        entireTok = generateToken(tokenRet)
        window.localStorage.setItem('access_token', entireTok)
        this.setState({ logged_in: true})
       }})
       .catch(err=> console.log(err))
      }

 artistsToState = (artArr) => {
  this.setState({
    artistsObjArr: artArr
  })
 }


tokenProp = () => {
  if(deco && deco() != null){
    return deco()
  } else {
      let newTok = window.localStorage.getItem('access_token')
      const myDecodedToken =  decodeToken(newTok);
      if(myDecodedToken)
   return myDecodedToken.spotify_token
  } 
}

stateLogin = () => {
  this.setState({logged_in: true})
}

  render(){
  return (
        <Router>
            { this.props.currentUser == null && window.localStorage.getItem('access_token') == null ? <div className="not-logged-in-App">
             <UserInput stateLogin = {this.stateLogin} />
                  </div> : ''}
           {  this.props.currentUser !== null && !this.props.currentUser.error ? 
                <div id='logged-in-user'>{this.props.currentUser && window.localStorage.getItem('access_token') === null ? this.tokenFetch():''}
                <SpotifyFetch artistsToState={this.artistsToState}/>
                <Navbar  />   
                <Route path="/home" render= {routerProps => <Home {...routerProps} artists={this.state.artistsObjArr} token= {this.tokenProp()}/> }/> 
                <Route exact path="/" render= {routerProps => <Home {...routerProps} artists={this.state.artistsObjArr} token= {this.tokenProp()}/> }/> 
                <Route path='/artists' render={ routerProps => <ArtistContainer {...routerProps} artists={this.state.artistsObjArr} token= {this.tokenProp()}/>}/>
                <Route path='/favorites' render={ routerProps => <FavoritesContainer {...routerProps} artists={this.state.artistsObjArr} token= {this.tokenProp()}/>}/>
            </div>:''}
       </Router> 
   );
  }
}

const mapStateToProps = state => {          
  return {   //Access To CurrentUser in Props          
           currentUser: state.currentUser,
  }
}

const mapDispatchToProps = dispatch => ({
   
  //addToken: token => dispatch({type: 'ADD_TOKEN', token}),             // sends Token Data to Action Creator allowing Token Info to be Dispatched to Store State
  getCurrentUser: () =>  dispatch(getCurrentUser()),                  // sends CurrentUser data to Action Creator & stores in Redux state
 })

export default connect(mapStateToProps, mapDispatchToProps)(App);