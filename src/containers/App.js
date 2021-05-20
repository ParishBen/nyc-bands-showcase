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
import { isExpired, decodeToken } from "react-jwt";
import {dandy} from '../tokenSecret';
var jwt = require('jsonwebtoken');

  const codeIntake = () => {
    if(window.location.href.includes('access_token')){
   return  window.location.href.split('=/')[1]  }  // AFTER login is initiated the Spotify API puts parameters in URL  'access token'. This grabs the AccessToken info.
}

 let tokenRet, entireTok;

const generateToken = (tokenVal) => {
    var u = {
      spotify_token: tokenVal 
      }; 
    let jwtToken = jwt.sign(u, dandy, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
       })
    return jwtToken
  }

  //const myDecodedToken =  entireTok != null ? decodeToken(entireTok): '';
  //const isMyTokenExpired =  isExpired(generateToken());

  export const deco =  () => { 
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
      //(window.location.href.includes('access')|| window.location.href.includes('home')|| window.location.href.includes('artists') || window.location.href.includes('favorites')) ? true : false // if the Spotify access token info isn't present then User isn't logged in yet.  
    }
  }


componentDidMount(){
  console.log("we mounted!"+` ${this.state.logged_in}`) // Checking to see when & how many renders occur
  // if (!window.location.href === 'http://localhost:3000'|| 'http://localhost:3000/'){    // if we have any other URL than the landing page => sending currentUser to Props & Store
  this.props.getCurrentUser()
  //this.checkForUser()
  if(this.props.currentUser){
    this.tokenFetch()
  }
  // if(this.props.currentUser){ 
  //   this.tokenFetch()
  //   this.setToken()  }  // Sets the Token to State upon mounting & having access_token in the URL response from Spotify API
}

 tokenFetch = () => {
        fetch('http://localhost:8888/toke', {
          headers: {
          'Content-Type':'application/json',
          Accept:'application/json',
          credentials: "include"
       }})
       .then(resp=> resp.json())
       .then(ressy=> {
         console.log('generating token')
         generateToken(ressy.token)
        tokenRet = ressy.token
        entireTok = generateToken(ressy.token)
        console.log('putting in localStorage')
        window.localStorage.setItem('access_token', entireTok)
        console.log('state is logged in now')
        this.setState({ logged_in: true})
         console.log('tokenRet '+tokenRet,'entireTok '+ entireTok)
        })
       .catch(err=> console.log(err))
      }


// tokenfunct = () => {                          // Grab Token from URL & send it to the Dispatch Action function for ADD_TOKEN
// let tokenVal = window.location.href.includes('=') ? window.location.href.split('=/')[1] : null     // If we have a correct landing page with Token data => perform function & store token in Store.
//       if(tokenVal !== null){
//       this.props.addToken(tokenVal)       // DISPATCHING the token value from URL to the Redux Store
//     } 
//   }

 artistsToState = (artArr) => {
  this.setState({
    artistsObjArr: artArr
  })
 }

// dispatcherSession = (someTokProp) => {
//   if(this.state.token !== null){
//     this.props.setSessionToken(someTokProp)  
//   }
//}

// tokenFetch = () => {
//   fetch('http://localhost:8888/toke', {
//     headers: {
//     'Content-Type':'application/json',
//     Accept:'application/json',
//     credentials: "include"
//  }})
//  .then(resp=> resp.json())
//  .then(ressy=> {
//   tokenRet = this.generateToken(ressy.token)
//   console.log(ressy.token, tokenRet)
//   return tokenRet
//   })
//  .catch(err=> console.log(err))
// }

tokenProp = () => {
  if(deco && deco != null){
    return deco
  } else {
      let newTok = window.localStorage.getItem('access_token')
      const myDecodedToken =  decodeToken(newTok);
      if(myDecodedToken)
   return myDecodedToken.spotify_token
  } 
}

loggerOut = () => {
  this.setState({logged_in: false})
}
stateLogin = () => {
  this.setState({logged_in: true})
}

  render(){
    //console.log(this.state)
  return (
        <Router>
            {this.props.currentUser == null && window.localStorage.getItem('access_token') == null ? <div className="not-logged-in-App">
             <UserInput stateLogin = {this.stateLogin} />
                  </div> : ''}
                  {/* //  this.props.currentUser != null && window.localStorage.getItem('access_token') == null ? <div id='current-user-click-Spotify'><p>{`Welcome ${this.props.currentUser.name},  Please click below to get started!`}</p>      
                  // <button id="Login-Spotify" onClick={()=> window.location = "http://localhost:8888/login"}>Complete your Login With Spotify</button> </div> : ''} */}
           {  this.props.currentUser !== null ? 
                <div id='logged-in-user'>{this.props.currentUser && window.localStorage.getItem('access_token') === null ? this.tokenFetch():''}
                <SpotifyFetch artistsToState={this.artistsToState}/>
                <Navbar  />   
                <Route path="/home" render= {routerProps => <Home {...routerProps} artists={this.state.artistsObjArr} token= {this.tokenProp()}/> }/> 
                <Route exact path="/" render= {routerProps => <Home {...routerProps} artists={this.state.artistsObjArr} token= {this.tokenProp()}/> }/> 
                <Route path='/artists' render={ routerProps => <ArtistContainer {...routerProps} artists={this.state.artistsObjArr} token= {this.tokenProp()}/>}/>
                <Route path='/favorites' render={ routerProps => <FavoritesContainer {...routerProps} artists={this.state.artistsObjArr} token= {this.tokenProp()}/>}/>
            </div>:''}{console.log(tokenRet,deco(), entireTok)}
       </Router> 
   );
  }
}

const mapStateToProps = state => {          
  return { token: state.token,              // Access to Token & CurrentUser in Props          
           currentUser: state.currentUser,
           sessionToken: state.sessionToken
  }
}

const mapDispatchToProps = dispatch => ({
   
  addToken: token => dispatch({type: 'ADD_TOKEN', token}),             // sends Token Data to Action Creator allowing Token Info to be Dispatched to Store State
  getCurrentUser: () =>  dispatch(getCurrentUser()),                  // sends CurrentUser data to Action Creator & stores in Redux state
  //setSessionToken: (tokenProp) => dispatch(setSessionToken(tokenProp))
 })

export default connect(mapStateToProps, mapDispatchToProps)(App);