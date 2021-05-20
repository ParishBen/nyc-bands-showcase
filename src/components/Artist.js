import '../stylesheet/basis.css';
import React from 'react';
import { connect } from 'react-redux';
import TopTracks from './TopTracks'
import {fetchTracks} from '../actions/artistActions'
//import {getSessionToken} from '../actions/getSessionToken'
import {deco} from '../containers/App'
import { isExpired, decodeToken } from "react-jwt";

class Artist extends React.Component{
 
findArtist = () => {                           // Check for props coming from Redux State & then find artist based on the id in the URL
   let artists = this.props.artists
   if(artists){ 
     let art = artists.find(art=> art.id === window.location.href.split('/')[4])
     //console.log(this.props)
    return art }
    }
      
    grabArtImage = () => {        // Ternary executed in render to see if props present & then grabbing Image of Artist 
      if (`${this.findArtist().images}`==[]){ // IF artist's image array is empty
        return <h3 style={{color:'red', textDecoration: 'underline dashed'}}>No Artist Image</h3>
      } 
      if (`${this.findArtist().images}`.length === 1) { //IF only one image in array
        return <img src={this.findArtist().images[0].url}                 
        alt={this.findArtist().name}/>;
       } else {      // Will pull the second image in array otherwise
            return <img src={this.findArtist().images[1].url}                 
                  alt={this.findArtist().name}/>;
        }      
      }
    
       checkforprops=()=>{
         if(this.props.artists){ this.findArtist() }
       } 
    
     componentDidMount(){                      //props check & then using token Props to fetch Artists' TopTracks
        this.checkforprops()
        //this.props.fetchTracks(window.localStorage.getItem('token')) 
        console.log(deco) 
        if(deco && deco() != null){
          console.log(deco)
        this.props.fetchTracks(deco())  
        } else {
          let newTok = window.localStorage.getItem('access_token')
          const myDecodedToken =  decodeToken(newTok);
  //const isMyTokenExpired =  isExpired(generateToken());
          console.log(newTok, myDecodedToken)
          if(myDecodedToken)
          this.props.fetchTracks(myDecodedToken.spotify_token)
//const deco = myDecodedToken.spotify_token
    }}
  
    handleTopTracks = () => {        // returning loading if Redux Store is loading (while fetch is taking place) & then rendering TopTracks Component
        if (this.props.loading) {
            return <h2 id='loading-header'>Loading Tracks...</h2>
             } if(this.props.toptracks && this.props.toptracks != null){
            return <TopTracks currentUser={this.props.currentUser} toptracks={this.props.toptracks} />
          } 
          // if(!this.props.toptracks){
          //      this.props.fetchTracks(window.localStorage.getItem('token'))
          //   return <TopTracks currentUser={this.props.currentUser} toptracks={this.props.toptracks} />
          // }
      }
     artBackGround = () => {
       let src = document.querySelector('img').src
       console.log(src)
      document.querySelector('body').style.background = `url("${src}") no-repeat fixed center`
      document.querySelector('body').style.backgroundSize = 'cover'

     }
    
render(){
    
    return(
        
          <div id="artist-div"> 
            {document.querySelector('img') && this.artBackGround()}  
            {document.getElementById('thisDiv') ? document.getElementById('thisDiv').innerHTML = '' : ''}
            <h2 id="artist-title" style={{textAlign:'center'}}><span style={{backgroundColor:'gray'}}>{this.findArtist() !== undefined ? this.findArtist().name : ''}</span> </h2>
            {this.findArtist() !== undefined ? <div> {this.grabArtImage()}</div> : ''} 
            {this.props.toptracks && this.findArtist() !== undefined  ? <div>{this.handleTopTracks()}</div> :''}{console.log(deco())}           
          </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      toptracks: state.toptracks,             // Props Access of Redux State for toptracks/loading/token/current_user
      loading: state.loading,
      token: state.token,
      currentUser: state.currentUser
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return { 
      fetchTracks: (anyProp) => dispatch(fetchTracks(anyProp)),      //Dispatch functions for fetching tracks & sessionToken
      //getSessionToken: () => dispatch(getSessionToken())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Artist)
