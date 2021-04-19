import React from 'react'
import nycBands from '../nycBands'



const codeIntake = () => {
    if(window.location.href.includes('access_token')){
      return  window.location.href.split('=/')[1]    // AFTER login is initiated the Spotify API puts parameters in URL  'access token'. This grabs the AccessToken info.
    }
  }
   
const properCase =              // this goes through the imported list of Bands formed in NYC. Then URI encodes the non-alphabetical characters for the Fetch Request.
    nycBands.map(artist => {
        return artist.replaceAll(' ','%20').replaceAll("'","%27").replaceAll(":", "%3A").replaceAll('.',"+.")
      })
  
const artistArrReducer = (newArt, artArray) => {    // Takes in the Artist & Array & will check the array if the Artist Object is already in the Array based on unique ID.
    return artArray.find(artist=> artist.id === newArt.id)
  }

  
  export default class SpotifyFetch extends React.Component { 
    
    constructor(){
      super();
      this.state = {
        artists: []
      }
    }
    
    componentDidMount(){
      if(this.state.artists.length < 140){
      this.allNycBandsFetch()
      }
    }

  allNycBandsFetch = () => {                                             
        let artistsObjArr = []; // this will hold Every Artist object return
        for (let i=0; i< properCase.length; i++){    // this loops through each uri encoded band-name & does get Fetch to Spotify
          fetch(`https://api.spotify.com/v1/search?q=${properCase[i]}&type=artist`, {
            headers: {
                'Content-Type':'application/json',
                 Accept:'application/json',
                 "Authorization": `Bearer ${codeIntake()}`    //  codeIntake=> accesstoken auth
                }
              })
              .then(resp=> resp.json())
              .then(artObjs=> {                     // going to put this artist obj(s) response into another function which returns correct artist obj from results
                  let foundArtist = artObjs.artists.items        // this returns artist(s) item's array from Spotify
                    if (foundArtist && `${foundArtist.length}` > 0){    // if response isn't undef & has any length
                      let realArtist = foundArtist.find( artist => artist.name === decodeURI(properCase[i])) // find artist in array of objects with the exact name matching the initial unencoded band name.
                      //console.log(realArtist, foundArtist)
                      if (realArtist.name == "Run-DMC"){   //Exception Case for Artist=> title: Run-D.M.C. posed problems in fetch due to '.' Will grab correct Artist.id now.
                        realArtist = foundArtist.find(artist => artist.id == "3CQIn7N5CuRDP8wEI7FiDA")   //Setting exception case ID for Run-D.M.C.
                      }
                        if (realArtist !== undefined){         
                          if(!artistArrReducer(realArtist, artistsObjArr)){ // REDUCER - if we have a realArtist value it checks if that Artist object is in Array. IF not present will push to array.
                             artistsObjArr.push(realArtist)
                        }
                      }
                    }  
                 })
              .then(() => {
                this.setState({
                  artists: artistsObjArr
                })
              })
            .then(() => {
                if(this.state.artists.length >= 139){   // Will only trigger CallbackFn to SetState of App.js' Artists when the for-loop finishes
                  this.props.artistsToState(this.state.artists)
              }
            })          
            .catch( err => console.log(err))
        }
      }

       delayed = setTimeout(() => {              // Will reFetch all the bands after 8 seconds IF Spotify didn't return all the bands properly
        if(this.state.artists.length < 140){
            this.allNycBandsFetch()
          } 
        }, 8000)

    render(){

      return (
              <div id="delayed fetch" style={{display:'none'}}>{this.delayed}</div>  
            )
      }
}