import React from 'react'
import nycBands from '../nycBands'
import '../stylesheet/basis.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {deco} from '../containers/App';
import { decodeToken } from "react-jwt";
import {dandy} from '../tokenSecret';
var jwt = require('jsonwebtoken');
    
  
    
    const properCase =              // this goes through the imported list of Bands formed in NYC. Then URI encodes the non-alphabetical characters for the Fetch Request.
    nycBands.map(artist => {
      return artist.replaceAll(' ','%20').replaceAll("'","%27").replaceAll(":", "%3A").replaceAll('.',"+.")
    })
    
    const artistArrReducer = (newArt, artArray) => {    // Takes in the Artist & Array & will check the array if the Artist Object is already in the Array based on unique ID.
    return artArray.find(artist=> artist.id === newArt.id)
  }
 
  export default class SpotifyFetch extends React.Component { 
    
    
    decoVal = () => {
     if(deco && deco() != null){    // Returns the imported Token Value from App.js
       console.log(deco())
       return deco()
     } else {
         let newTok = window.localStorage.getItem('access_token')    // OR grabs it from the LocalStorage / Decodes it for the Token Value
         if (newTok){
         const myDecodedToken =  decodeToken(newTok);
         console.log(myDecodedToken)
      return myDecodedToken.spotify_token}
     }
   }
    
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
      //this.newfetchmcgee()
    }

    // myduuudes = () => {
    //     fetch('https://test-server.brapi.org/brapi/v2/commoncropnames',{
    //         headers: {
    //             Accept: 'application/json'
    //     }})
    //     // })
         
    //     .then(res=> res.json())
    //     .then(resp=> console.log(resp))
    //     .catch(err=>console.log(err))
    // }

  allNycBandsFetch = () => {                                             
        let artistsObjArr = []; // this will hold Every Artist object return
        for (let i=0; i< properCase.length; i++){    // this loops through each uri encoded band-name & does get Fetch to Spotify
          fetch(`https://api.spotify.com/v1/search?q=${properCase[i]}&type=artist`, {
            //credentials: "include",
            headers: {
                'Content-Type':'application/json',
                 Accept:'application/json',
                 "Authorization": `Bearer ${this.decoVal()}`    //  TokenValue=> To make a Fetch to Spotify to return artist data
                }
              })
              .then(resp=> resp.json())
              .then(artObjs=> {  
                if(artObjs.error){if(artObjs.error.message === ("Invalid access token" || "The access token expired")){
                  console.log(artObjs.error) 
                  return window.location = "http://localhost:8888/login"
                }}
                // if(artObjs.error.details.includes("Invalid Access")) {
                  // window.location = "http://localhost:8888/login"
                   else {               // going to put this artist obj(s) response into another function which returns correct artist obj from results
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

        newfetchmcgee = () => {
          fetch('https://app.ticketmaster.com/discovery/v2/events.json?keyword=Lumineers&classificationName=music&locale=en-us&apikey=JcHBGDzcTW1CwZ7zgfznR4koIFNm8zmn')
     
      .then(resp=> resp.json())
              .then(eventObj=> {  
                if(eventObj.error) {
                  console.log(eventObj.error)
                }   else { 
                  console.log(eventObj._embedded.events[0]._embedded.venues[0].name, ": ",eventObj._embedded.events[0]._embedded.venues[0].city.name+", "+eventObj._embedded.events[0]._embedded.venues[0].country.name)
              }})
                  .catch(err=> console.log(err))
                }
    render(){
//Invisible Fetch- to push Artists to App.js state
      return (
              <div id="delayed fetch" style={{display:'none'}}>{this.delayed}</div>  
            )
      }
}