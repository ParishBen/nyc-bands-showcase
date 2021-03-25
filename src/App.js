import './App.css';
import './stylesheet/basis.css'
import React, { Component } from 'react';
import nycBands from './nycBands.js';
import ArtistContainer from './containers/artistContainer'
import Navbar from './components/Navbar'
import {  BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './components/Home'
import FavoritesContainer from './containers/FavoritesContainer'
import {addToken} from './actions/add_token'
import {getCurrentUser} from './actions/addCurrentUser'





const codeIntake = () => {
  if(window.location.href.includes('access_token')){
   return  window.location.href.split('=')[1]  }  // AFTER login is initiated the Spotify API puts parameters in URL 'code' & 'access token'. This grabs the AccessToken info.
}


const properCase = // this goes through the imported list of Bands formed in NYC. Then URI encodes the non-alphabetical characters for the Fetch Request.
  nycBands.map(artist => {
      return artist.replaceAll(' ','%20').replaceAll("'","%27").replaceAll(":", "%3A").replaceAll('.',"+.")
    })



const uniqBy = (arr, key) => {
  var seen = {}; // hash container for pushing unique objects into
  return arr.filter( function(item) {
    var k = key(item);   // REDUCE - will conduct function 'key' on each item in arr & assign value k
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);  // if k is not unique to seen array then FALSE. if unique added to "seen" at index k. Using Json.stringify as key function to each item 
  })
}


const stagnantToken = () => { if(window.location.href.includes('=')){ return window.location.href.split('=')[1] }}



let imgArr = [];


class App extends Component {

  constructor(){
    super();
    this.state = {
      currentUser: '',
      name:'',
      email: '',
      password: '',
      artistsObjArr: [],
      token: null,
      sessionToken: null,
      logged_in: window.location.href === 'http://localhost:3000/' ? false : true // if the Spotify access token info isn't present then User isn't logged in yet.  
    }
  }

setToken(){
 if (!this.state.logged_in ) return
 this.setState({
   token: codeIntake()
 })

}



componentDidMount(){
  console.log("we mounted!") // Checking to see when & how many renders occur
  this.allNycBandsFetch()    // Goes through each artist in array & performs fetch to Spotify API. Saved to State
  this.setToken()           // Sets the Token upon mounting & having access_token in the URL response from Spotify API
  this.tokenToSession()       // Sends the token data to the backend to store in session
  this.getCurrentUser()          // Grabbing current_user from Backend and putting into Store.
  if(window.location.href === 'http://localhost:3000'|| 'http://localhost:3000/'){    // if we have any other URL than the landing page => sending currentUser to Props & Store
  this.props.getCurrentUser()}
   let tokenVal = window.location.href.includes('=') ? window.location.href.split('=')[1] : null     // If we had a correct landing page with Token data => perform function & store token in Store.
      if(tokenVal !== null){
      this.tokenfunct(tokenVal)
    } 
    


}


tokenfunct = () => {                          // Grab Token from URL & send it to the Dispatch Action function for ADD_TOKEN
  if (!this.state.logged_in ) return
 if(
  window.location.href.includes('access_token') ){
   this.props.addToken(window.location.href.split('=')[1])}
  }

tokenToSession = () => {                       // Sends POST request to backend SessionsController to create session[:token]
 let tokenProps = this.props.token && this.props.token !== null ? this.props.token : null
  if(tokenProps){
  return fetch('http://localhost:9000/token', {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      token: tokenProps
    })
  })
  .then(res=> res.json())
  .then(backendToken => {
    if (backendToken.error){
      console.log(backendToken.error)
      alert(backendToken.error)
    } else {
    console.log(backendToken, 'should be json_token', backendToken.token)
    this.setState({sessionToken: backendToken.token})
    }
  }).catch(err=>console.log(err))
 }
}

allNycBandsFetch(){                                             
  let artistsObjArr = []; // this will hold EVERY artist object return
  let uniqueArtistsObjs = []; // this will only hold unique artist objects

  for (let i=0; i< properCase.length; i++){    // this loops through each uri encoded band-name & does get Fetch
   
    fetch(`https://api.spotify.com/v1/search?q=${properCase[i]}&type=artist`, {
      headers: {
          'Content-Type':'application/json',
           Accept:'application/json',
           "Authorization": `Bearer ${codeIntake()}`    //  codeIntake=> accesstoken auth
      }
     })
     .then(resp=> resp.json())
     .then(artObjs=> {                     // going to put this artist obj(s) response into another function which returns correct artist obj from results
        let foundArtist = artObjs.artists.items               // this returns artist(s) item's array from Spotify
        
        if (foundArtist !== undefined && `${foundArtist.length}` > 0){  // if response isn't undef & has any length
            let realArtist = foundArtist.find( artist => artist.name === decodeURI(properCase[i])) // find artist in array of objects with the exact name matching the initial search
            if (realArtist.name == "Run-DMC"){                            //Exception Case for Artist=> title: Run-D.M.C. posed problems in fetch due to '.' Will grab correct Artist.id now.
               realArtist = foundArtist.find(artist => artist.id == "3CQIn7N5CuRDP8wEI7FiDA")   //Setting exception case ID for Run-D.M.C.
            }
            if (realArtist !== undefined){                       // if we have a hit on name matches in the objects & fetch search
            artistsObjArr.push(realArtist)                      // pushing the artist obj into array (possible for duplicates/wrong artists because search returns many artists similar to name searched in Spotify DB)
            //console.log(this.filterFunct(realArtist, artistsObjArr))
          }
        }
        uniqueArtistsObjs = uniqBy(artistsObjArr, JSON.stringify)         // reducer -> will stringify the object & then search & return only unique values in array
        //uniqueArtistsObjs = artistsObjArr
      })
      .then(() => {
        // Sets State with unique array of Artists' Objects
        this.setState({
          artistsObjArr: uniqueArtistsObjs
      })
    })
    
    .catch( err => console.log(err))
  }
}

//  filterFunct = (inp, arr) => {         // not properly filtering array & pushing values
//    let notUniq = arr.filter(artist => {
//     if (artist.id === inp.id){
//   return  
//    } else {
//      arr.push(inp)
//    }
// })
//   return notUniq
//  }







     



  delayed = setTimeout(() => {
  if(`${this.state.artistsObjArr}`.length < 140){
     this.allNycBandsFetch()
   } else{console.log('full artists array!')}
 }, 7000)



handleUserInfoChange(event) {                                // Signing in to Landing Page handling value changes
  this.setState({
    [event.target.name]: event.target.value,
  });
}

handleUserInfoSubmit(event) {                               // Handling Submit of user info to find/create a User in Backend => sets session to user.id
  event.preventDefault();
  //this.props.addBand(this.state.bandName);
  fetch('http://localhost:9000/login', {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    })
    })
  .then(res => res.json())
  .then(user=> {
    if(user.error) {
      alert(user.error)
    } else {
      this.setState({
        currentUser: user  
      })
      console.log(this.state.currentUser, user)
    }

  })
  .then(() => window.location= "http://localhost:8888/login")
  .catch(err=> alert(err))
  this.setState({
    name: '',
    email: '',
    password: ''
  });
}

logout = event => {
  event.preventDefault()
  fetch('http://localhost:9000/logout', {
    credentials: "include",
    headers: {
      method: "DELETE",
      'Content-Type': 'application/json'
    }
  })
  this.setState({
    currentUser: null,
  })
}




getCurrentUser = () => {
  fetch('http://localhost:9000/currentuser', {                      // Fetching CurrentUser data from Backend session. Returned data Serialized: id, email, name of User.
    credentials: "include",
    headers: {
      "Content-type": 'application/json',
      Accept: 'application/json'
    }
  })
  .then(resp => resp.json())
  .then(user => {
    if(user.error){
      alert(user.error)
    } else {
    this.setState({currentUser: user})
  }
})
  .catch(err=> console.log(err))

}


  render(){
    //console.log(this.state)
  return (
        <Router>
            {!this.state.currentUser && !this.state.logged_in ? <div className="not-logged-in-App">
              <p>Hey there, please sign in/up below!</p>
            <form onSubmit={(event) => this.handleUserInfoSubmit(event)} style={{border: '1pt solid white'}}>
          <label>Email: &nbsp; </label>
          <input
            type="text" name="email"
            value={this.state.email}
            onChange={(event) => this.handleUserInfoChange(event)} /><br/>
            <label>Name:&nbsp; </label>
            <input
            type="text" name="name"
            value= {this.state.name}
            onChange={(event)=> this.handleUserInfoChange(event)} /><br/>
            <label>Password:</label>
            <input
            type="password" name="password"
            value= {this.state.password}
            onChange={(event)=> this.handleUserInfoChange(event)} />
          <input type="submit" />
        </form>
                  {/* <header className="App-header"> <div><p>Hey there, please sign in below to get started!</p></div>      
                  <button id="Login-Spotify" onClick={()=> window.location= "http://localhost:8888/login"}>Log in With Spotify</button>
                  </header></div> :  */}
                  </div> : 
                   this.state.currentUser && !this.state.logged_in ? <div id='current-user-click-Spotify'><p>{`Welcome back,  Please click below to get started!`}</p>      
                  <button id="Login-Spotify" onClick={()=> window.location= "http://localhost:8888/login"}>Complete your Login With Spotify</button> </div> : ''}
           { this.state.logged_in && this.props.token !== null ? 
            <div><Navbar token= {this.props.token && this.props.token !== null ? this.props.token : this.state.token} logged_in={this.state.logged_in} current_user={this.state.currentUser} />   
                <div id="invisibleFetch" style={{display:'none'}}>{this.delayed}</div>
                <Route exact path="/" render= {routerProps=> <Home {...routerProps} artists={this.state.artistsObjArr} token= {this.props.token && this.props.token !== null ? this.props.token : this.state.token}/> }/>  
                <Route path='/artists' render={ routerProps => <ArtistContainer {...routerProps} artists={this.state.artistsObjArr} token= {this.props.token && this.props.token !== null ? this.props.token : this.state.token}/>}/>
                <Route path='/favorites' render={ routerProps => <FavoritesContainer {...routerProps} artists={this.state.artistsObjArr} token= {this.props.token && this.props.token !== null ? this.props.token : this.state.token}/>}/>
            </div>:''}{window.location.href.includes('=') ? this.tokenfunct() : ''}
       </Router> 
   );
  }
}


const mapStateToProps = state => {
  return { token: state.token,                        // Access to Token & CurrentUser in Props
           currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    addToken: (token) => { dispatch(addToken(token))                    // sends Token Data to Action Creator allowing Token Info to be Dispatched to Store State
   },
   getCurrentUser: () => { dispatch(getCurrentUser())}                   // sends CurrentUser data to Action Creator & stores in Redux state
  }
 }


export default connect(mapStateToProps, mapDispatchToProps)(App);

