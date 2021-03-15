import './App.css';
import React, { Component } from 'react';
import nycBands from './nycBands.js';
import ArtistContainer from './containers/artistContainer'
import Navbar from './components/Navbar'
import {  BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './components/Home'
//import { fetchArtists } from './actions/artistActions'
 import Artist from './components/Artist'
// import Favorites from './components/Favorites'
import FavoritesContainer from './containers/FavoritesContainer'


const codeIntake = () => {
  if(window.location.href !== 'http://localhost:3000/' || 'http://localhost:3000'){
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


const stagnantToken = window.location.href.split('=')[1]













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



componentDidMount(){
  // this.allNycBandsFetch()
  console.log("we mounted!")
  // this.setToken()
  this.allNycBandsFetch()
  //this.setToken()
  this.setState({
    token: stagnantToken
  })
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
     .then(artObjs=> {    // going to put this artist obj(s) response into another function which returns correct artist obj from results
        let foundArtist = artObjs.artists.items   // this returns artist(s) item's array.
        
        if (foundArtist !== undefined && `${foundArtist.length}` > 0){  // if response isn't undef & has any length
            let realArtist = foundArtist.find( artist => artist.name === decodeURI(properCase[i])) // find artist in array of objects with name matching the initial search
            if (realArtist.name == "Run-DMC"){
              //console.log(realArtist, foundArtist.find(artist => artist.id == "3CQIn7N5CuRDP8wEI7FiDA"))
               realArtist = foundArtist.find(artist => artist.id == "3CQIn7N5CuRDP8wEI7FiDA")
            }
            if (realArtist !== undefined){  // if we have a hit on name matches in the objects & fetch search
            artistsObjArr.push(realArtist)  // pushing the artist obj into array (possible for duplicates)
            //console.log(properCase[i], decodeURI(properCase[i]), foundArtist, realArtist)
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
  //this.randomFetches()
  console.log('we updated!')
 

}


// randomFetches(){
//   if(this.state.artistsObjArr.length >=141){
//   let strObj = this.state.artistsObjArr[Math.floor(Math.random()*this.state.artistsObjArr.length)]    // pulling object straight from state didn't allow for direct URL fetch so this workaround allowed it
//   let stringified= JSON.stringify(strObj)
//   //console.log(stringified)

    
//     let objHref = stringified.substring(stringified.indexOf("\"href\"\:\"")+8, stringified.indexOf("\",\"id\""))  
    
//     console.log(objHref)
//     // let strObj= stringified.substring(1, stringified.length-1)
//     //console.log(stringified.substring(1, stringified.length-1))
//     fetch(`${objHref}`, {
//       //fetch(`${this.state.artistsObjArr[2]}`.href, {
      
//       headers: {
//         'Content-Type':'application/json',
//         Accept:'application/json',
//         "Authorization": `Bearer ${codeIntake()}`    //  codeIntake=> accesstoken auth
//       }
//     })
    
//     .then(resp=> resp.json())
//     .then(artist => {
//             console.log( artist.images[1].url)
//             let imgSrc= artist.images[1].url
//             if(imgSrc){
//               let myImg = document.createElement('img')
//               let myImgH2 = document.createElement('h2')
//               myImgH2.innerText = artist.name
//                {myImg.src= imgSrc}
//                {myImg.alt = artist.name}
//             let imgholder= document.getElementById('thisDiv')
//             console.log(imgholder, myImg)
//             imgholder.append(myImgH2, myImg)}
//           }).catch(err=> console.log(err))
        
//         }
        
//       } 
     
  


  randomImager=(anyImg) => {      
            
              
              
          return <img src={`${anyImg}`} alt={`${anyImg}`}/>
            
  }
   


delayFetch = () => {
setTimeout(() => {
  if(this.state.artistsObjArr.length < 140){
    this.allNycBandsFetch()
  }
}, 10000);}



//    removeThatDiv = () =>{
//     let myDiv = document.getElementById('thisDiv')
//     console.log(myDiv)
//     myDiv.remove()
    
// }



// handleDivIt = () => {
//   let theDiv = document.getElementById('thisDiv')
//   let theP = <p>Rad {'&'} Random Generated NYC Bands Below. Use the Navbar up top to check out more!</p>
// if (theDiv && theDiv.children.length >= 1) {
// theDiv.append(theP)}
// }

reFetcher = () => {
 setTimeout(() => {
  if(this.state.artistsObjArr.length < 140){
    let k=1
    while (k>0){
    this.allNycBandsFetch()
    k--
    }
  }
}, 13000);}


  render(){
    console.log(this.state)
  return (
        <Router>
      
     
      {!this.state.logged_in ? <div className="not-logged-in-App">
      <header className="App-header"> <div><p>Hey there, please sign in below to get started!</p></div>      
      <button id="Login-Spotify" onClick={()=> window.location= "http://localhost:8888/login"}>Log in With Spotify</button>
      </header></div>: <div>
      <Navbar token={codeIntake()} />   
      {this.reFetcher()}
       <Route exact path="/" render= {routerProps=> <Home {...routerProps} artists={this.state.artistsObjArr} token={this.state.token}/> }/>  

      <Route path='/artists' render={ routerProps => <ArtistContainer {...routerProps} artists={this.state.artistsObjArr} token={this.state.token}/>}/>
      <Route path='/favorites' render={ routerProps => <FavoritesContainer {...routerProps} artists={this.state.artistsObjArr} token={this.state.token}/>}/>
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
//* <Route exact path='/favorites' render= { routerProps => <Favorites {...routerProps} artists={this.state.artistObjArr}/>}/> */}
//<Route path={`artists/:artistId`} render={routerProps => <Artist {...routerProps} artists={this.state.artistsObjArr} token={this.state.token}  /> }/>