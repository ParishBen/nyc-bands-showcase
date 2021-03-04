import './App.css';
import React, { Component } from 'react';
import nycBands from './nycBands.js';
import ArtistContainer from './containers/artistContainer'
import Navbar from './components/Navbar'
import {  BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
//import { fetchArtists } from './actions/artistActions'
//import Artist from './components/Artist'
import Home from './components/Home'
import Favorites from './components/Favorites'


const codeIntake = () => {
  if(window.location.href !== 'http://localhost:3000/' || 'http://localhost:3000'){
   return  window.location.href.split('=')[1]  }  // AFTER login is initiated the Spotify API puts parameters in URL 'code' & 'access token'. This grabs the AccessToken info.
}


const properCase = // this goes through the imported list of Bands formed in NYC. Then URI encodes the non-alphabetical characters for the Fetch Request.
  
nycBands.map(artist => {
    return artist.replaceAll(' ','%20').replaceAll("'","%27").replaceAll(":", "%3A")
  })

const uniqBy = (arr, key) => {
  var seen = {}; // hash container for pushing unique objects into
  return arr.filter( function(item) {
    var k = key(item);   // REDUCE - will conduct function 'key' on each item in arr & assign value k
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);  // if k is not unique to seen array then FALSE. if unique added to "seen" at index k. Using Json.stringify as key function to each item 
  })
}
















let imgArr = [];



class App extends Component {

  constructor(){
    super();
    this.state = {
      //artists: [],
      artistsObjArr: [],
      token: null,
      logged_in: window.location.href === 'http://localhost:3000/' ? false : true // if the Spotify access token info isn't present then User isn't logged in yet.  
    }
  }

setToken(){
 if (!this.state.logged_in ) return
 this.setState({
   token: codeIntake()
 })

}


componentDidUpdate(){
  //handleTokenToProps()
}
componentDidMount(){
  this.allNycBandsFetch()
  console.log("we mounted!")
  this.setToken()
  // this.handleTokenToProps()

}
// handleLoading = () => {
//   console.log(this.props.loading)
//   if(this.props.loading) {
//     return <div>Loading...</div>
//   } else {
//     return <p>HHAHHAHHAHAHHAHHAHAHAHHAHAHHA</p>
//   }
// }

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
     .then(artObjs=> {    // going to put this artist obj(s) response into another function which returns correct artist obj from results
        let foundArtist = artObjs.artists.items   // this returns artist(s) item's array.
        
        if (foundArtist !== undefined && foundArtist.length){  // if response isn't undef & has any length
            let realArtist = foundArtist.find( artist => artist.name === decodeURI(properCase[i])) // find artist in array of objects with name matching the initial search
          if (realArtist !== undefined){  // if we have a hit on name matches in the objects & fetch search
            artistsObjArr.push(realArtist)  // pushing the artist obj into array (possible for duplicates)
          }
        }
          uniqueArtistsObjs = uniqBy(artistsObjArr, JSON.stringify) // reducer -> will stringify the object & then search & return only unique values in array
      
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



componentDidUpdate(){
  this.randomFetches()
}


randomFetches(){
  if(this.state.artistsObjArr.length >=140){
  let stuck = this.state.artistsObjArr[Math.floor(Math.random()*140)]
  let stringified= JSON.stringify(stuck)
  //console.log(stringified)

    
    let objHref = stringified.substring(stringified.indexOf("\"href\"\:\"")+8, stringified.indexOf("\",\"id\""))
    
    console.log(objHref)
    // let strObj= stringified.substring(1, stringified.length-1)
    //console.log(stringified.substring(1, stringified.length-1))
    fetch(`${objHref}`, {
      //fetch(`${this.state.artistsObjArr[2]}`.href, {
      
      headers: {
        'Content-Type':'application/json',
        Accept:'application/json',
        "Authorization": `Bearer ${codeIntake()}`    //  codeIntake=> accesstoken auth
      }
    })
    
    .then(resp=> resp.json())
    .then(artist => {
            console.log( artist.images[1].url)
            let imgSrc= artist.images[1].url
            if(imgSrc){
              let myImg = document.createElement('img')
               {myImg.src= imgSrc}
               {myImg.alt = artist.name}
            let imgholder= document.getElementById('thisDiv')
            console.log(imgholder, myImg)
            imgholder.append(myImg)}
          }).catch(err=> console.log(err))
        
        }
        
      // console.log( "YOURE FUCKING BULLSHIT" + stringified)
      // console.log(stringified.substring(1, stringified.length-1))
      // let realObj = stringified.substring(1, stringified.length-1)
      //console.log(typeof(realObj))
      //console.log(this.state.artistsObjArr[4])
      //let fifff = this.state.artistsObjArr[4]
     // console.log(fifff)
      //console.log(realObj.substring(realObj.indexOf("\"href\"\:\"")+7, realObj.indexOf(",\"id\"")))
      } 
     
   hotdamn= () => { 
  console.log(this.randomFetches(), this.randomImager(), this.randomImager(this.randomFetches()))
   }


  randomImager=(anyImg) =>{      
            
              
              
          return <img src={`${anyImg}`} alt={`${anyImg}`}/>
            
  }
   







   removeThatDiv = () =>{
    let myDiv = document.getElementById('thisDiv')
    console.log(myDiv)
    myDiv.remove()
    
}



// handleTokenToProps = () => {
// this.props.dispatch({type: 'ADD_TOKEN', token: this.state.token})
// }




  render(){
    console.log(this.state)
  return (
        <Router>
      
     
      {!this.state.logged_in ? <div className="not-logged-in-App">
      <header className="App-header"> <div><p>Hey there, please sign in below to get started!</p></div>      
      <button id="Login-Spotify" onClick={()=> window.location= "http://localhost:8888/login"}>Log in With Spotify</button>
      </header></div>: <div> 
      <Navbar token={codeIntake()} /><div id="thisDiv"></div> 
      <Route exact path="/" render= {() => <div><p> Random Generated NYC Band(s) Above. Use the Navbar up top to check out more!</p> </div> }/> 
      
      <Route path='/artists' render={ routerProps => <ArtistContainer {...routerProps} artists={this.state.artistsObjArr} token={this.state.token}/>}/>
      <Route exact path='/favorites' component={Favorites}/>
      </div>} 
      

    </Router> 
   
  );
 }
}
// const mapStateToProps = state => {
//   return {
//     artistsObjArr: state.artistsObjArr,
//     loading: state.loading,
//     token: state.token
//   }
// }

const mapStateToProps = state => ({ artists: state.artistsObjArr})

export default connect(mapStateToProps)(App);

// {`${!window.location.href === 'http://localhost:3000' ? this.removeThatDiv() : ''}`} 