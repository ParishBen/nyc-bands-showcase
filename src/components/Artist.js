import '../stylesheet/basis.css';
import React from 'react';
import { connect } from 'react-redux';
import TopTracks from './TopTracks'
import {fetchTracks} from '../actions/artistActions'
import Concert from './Concerts'
import {deco} from '../containers/App'
import { decodeToken } from "react-jwt";

class Artist extends React.Component{
 
findArtist = () => {                           // Check for props coming from Redux State & then find artist based on the id in the URL
   let artists = this.props.artists
     if(artists){ 
       let art = artists.find(art=> art.id === window.location.href.split('/')[4])
       return art 
      }
    }
      
    grabArtImage = () => {        // Ternary executed in render to see if props present & then grabbing Image of Artist 
      if (`${this.findArtist().images}`==[]){ // IF artist's image array is empty
          return <h3 style={{color:'red', textDecoration: 'underline dashed'}}>No Artist Image</h3>
       } 
      if (`${this.findArtist().images}`.length === 1) { //IF only one image in array
            return <img  className="Artistimage" src={this.findArtist().images[0].url}                 
            alt={this.findArtist().name}/>;
       } else {      // Will pull the second image in array otherwise
           return <img className="Artistimage" src={this.findArtist().images[1].url}                 
           alt={this.findArtist().name}/>;
        }      
      }
    
       checkforprops=()=>{
         if(this.props.artists){ this.findArtist() }
       } 
    
     componentDidMount(){                      //props check & then using token Props to fetch Artists' TopTracks
        this.checkforprops()
        //this.props.fetchTracks(window.localStorage.getItem('token')) 
        if(deco && deco() != null){
        this.props.fetchTracks(deco())  
        } else {
          let newTok = window.localStorage.getItem('access_token')
          const myDecodedToken =  decodeToken(newTok);
          if(myDecodedToken)
          this.props.fetchTracks(myDecodedToken.spotify_token)
    }}
  
    handleTopTracks = () => {        // returning loading if Redux Store is loading (while fetch is taking place) & then rendering TopTracks Component
        if (this.props.loading) {
            return <h2 id='loading-header'>Loading Tracks...</h2>
             } if(this.props.toptracks && this.props.toptracks != null){
            return <TopTracks toptracks={this.props.toptracks} artistName = {this.findArtist().name} artistId={this.findArtist().id} />
          } 
        
      }
     artBackGround = () => {
       let src = document.querySelector('img').src
      document.querySelector('body').style.background = `url("${src}") no-repeat fixed center`
      document.querySelector('body').style.backgroundSize = 'cover'

     }
     handlegrabArtist = () => {
       return this.props.artists && this.findArtist() != null ? this.findArtist().name : ''
     }
    
render(){
    
    return(
        
          <div id="artist-div"> 
            {document.getElementById('thisDiv') ? document.getElementById('thisDiv').innerHTML = '' : ''}
            {document.querySelector('img') && this.artBackGround()}  
            <br></br><h2 id="artist-title" style={{textAlign:'center'}}><span style={{backgroundColor:'gray'}}>{  this.props.artists && this.handlegrabArtist() }</span> </h2>
            {this.props.artists && this.findArtist() !== undefined ? <div> {this.grabArtImage()}</div> : ''}{this.props.artists && this.findArtist() !== undefined ? <Concert name={this.props.artists && this.findArtist().name}/>:''} 
            {this.props.toptracks && this.findArtist() !== undefined  ? <div>{this.handleTopTracks()}</div> :''}         
          </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      toptracks: state.toptracks,             // Props Access of Redux State for toptracks/loading/token/current_user
      loading: state.loading,
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
