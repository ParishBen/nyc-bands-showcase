import '../stylesheet/basis.css'
import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import ArtistContainer from './artistContainer'
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import FavoritesContainer from './FavoritesContainer'
import UserInput from '../components/UserInput'
import SpotifyFetch from '../components/SpotifyFetch'
import {getCurrentUser} from '../actions/addCurrentUser'
import {setSessionToken} from '../actions/getSessionToken'


const codeIntake = () => {
  if(window.location.href.includes('access_token')){
   return  window.location.href.split('=/')[1]  }  // AFTER login is initiated the Spotify API puts parameters in URL  'access token'. This grabs the AccessToken info.
}

class App extends Component {

  constructor(){
    super();
    this.state = {
      artistsObjArr: [],
      logged_in: (window.location.href.includes('access_token')|| window.location.href.includes('artists') || window.location.href.includes('favorites')) ? true : false // if the Spotify access token info isn't present then User isn't logged in yet.  
    }
  }

setToken(){
  console.log('setTOKENING!-localstoraging!')
 if (!this.state.logged_in || !window.location.href.includes('access_token')){ return
} else { window.localStorage.setItem('token', codeIntake())
 this.setState({
   token: codeIntake()
 })
}
}

componentDidMount(){
  console.log("we mounted!"+` ${this.state.logged_in}`) // Checking to see when & how many renders occur
  this.setToken()    // Sets the Token to State upon mounting & having access_token in the URL response from Spotify API
  if(this.state.token && this.state.token != null){ this.dispatcherSession(this.state.token)  } // DISPATCHES an Action Creator to put Token Value into Backend Session & then into Redux Store   
  if (!window.location.href === 'http://localhost:3000'|| 'http://localhost:3000/'){    // if we have any other URL than the landing page => sending currentUser to Props & Store
  this.props.getCurrentUser()
  } 
}



tokenfunct = () => {                          // Grab Token from URL & send it to the Dispatch Action function for ADD_TOKEN
let tokenVal = window.location.href.includes('=') ? window.location.href.split('=/')[1] : null     // If we have a correct landing page with Token data => perform function & store token in Store.
      if(tokenVal !== null){
      this.props.addToken(tokenVal)       // DISPATCHING the token value from URL to the Redux Store
    } 
  }

 artistsToState = (artArr) => {
  this.setState({
    artistsObjArr: artArr
  })
 }

dispatcherSession = (someTokProp) => {
  if(this.state.token !== null){
    this.props.setSessionToken(someTokProp)
    
  }
}
tokenProp = () => {
  if (this.state.token !== null)
    return this.state.token
  if(this.props.token !== null)
    return this.props.token
  if(this.props.sessionToken !== null)
    return this.props.sessionToken
}
  render(){
    //console.log(this.state)
  return (
        <Router>
            {!this.props.currentUser && !this.state.logged_in ? <div className="not-logged-in-App">
             <UserInput />
                  </div> : 
                   this.props.currentUser && !this.state.logged_in ? <div id='current-user-click-Spotify'><p>{`Welcome ${this.props.currentUser.name},  Please click below to get started!`}</p>      
                  <button id="Login-Spotify" onClick={()=> window.location= "http://localhost:8888/login"}>Complete your Login With Spotify</button> </div> : ''}
           { this.state.logged_in && this.props.currentUser !== null ? 
                <div id='logged-in-user'>{this.tokenfunct()} 
                <SpotifyFetch artistsToState={this.artistsToState}/>
                <Navbar token= {this.tokenProp()} />   
                <Route exact path="/" render= {routerProps => <Home {...routerProps} artists={this.state.artistsObjArr} token= {this.tokenProp()}/> }/> 
                <Route path="/access_token=/:token" render= {routerProps => <Home {...routerProps} artists={this.state.artistsObjArr} token= {this.tokenProp()}/> }/> 
                <Route path='/artists' render={ routerProps => <ArtistContainer {...routerProps} artists={this.state.artistsObjArr} token= {this.tokenProp()}/>}/>
                <Route path='/favorites' render={ routerProps => <FavoritesContainer {...routerProps} artists={this.state.artistsObjArr} token= {this.tokenProp()}/>}/>
            </div>:''}{this.props.token && this.dispatcherSession(this.state.token)}
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
  setSessionToken: (tokenProp) => dispatch(setSessionToken(tokenProp))
 })

export default connect(mapStateToProps, mapDispatchToProps)(App);