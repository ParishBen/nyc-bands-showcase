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
import mySecret from '../tokenSecret';
var jwt = require('jsonwebtoken');



const generateToken = (tokenVal) => {   // Takes the Parameter of an Access Token value & then creates a JWT
    var u = {
      spotify_token: tokenVal 
    }; 
    let jwtToken = jwt.sign(u, mySecret)
  return jwtToken
}


let tokenRet; 
let entireTok;

  export const deco =  () => {   // If tokenRet has the fetched AccessToken value then decode the JWT & return just the Spotify Token value.
    if(tokenRet != null){
      const myDecodedToken = decodeToken(entireTok) 
      
      return myDecodedToken.spotify_token  // will return the valid Spotify token value
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
  
    this.props.getCurrentUser()
    if(this.props.currentUser && !this.props.currentUser.error){
      this.tokenFetch()// Fetches & Sets the Token in a JWT into LocalStorage upon mounting 
    }
  }

  tokenFetch = () => {
      fetch('http://localhost:8888/toke', {  //Spotify's defined callback address (running express server). I set up cors to receive /toke then it will send back token
          //credentials: "include",
        headers: {
        'Content-Type':'application/json',
        Accept:'application/json',
        }
      })
       .then(resp=> resp.json())
       .then(resp=> {
         if(resp.keys !== null ){
            tokenRet = resp.token  // Setting var tokenRet to Spotify access token
            entireTok = generateToken(tokenRet) // Now a JWT to place into localStorage.
            window.localStorage.setItem('access_token', entireTok)
            this.setState({ logged_in: true})
          }
        })
       .catch(err=> console.log(err))
      }

 artistsToState = (artArr) => { // Callback to have State of all the fetched Artists
  this.setState({
    artistsObjArr: artArr
  })
 }


tokenProp = () => {   // Checks for token value first then if there was refresh or it was cleared - 
  if(deco && deco() != null){ // Can pull from localStorage
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
   
  //addToken: token => dispatch({type: 'ADD_TOKEN', token}),  //No longer storing token in React/Redux state
  getCurrentUser: () =>  dispatch(getCurrentUser()),   // sends CurrentUser data to Action Creator & stores in Redux state
 })

export default connect(mapStateToProps, mapDispatchToProps)(App);