import '../stylesheet/basis.css';
import React from 'react';
import { connect } from 'react-redux';
import TopTracks from './TopTracks'
import {fetchTracks} from '../actions/artistActions'



class Artist extends React.Component{
 

findArtist = () => {
   let artists = this.props.artists
   if(artists){ 
     let art = artists.find(art=> art.id === window.location.href.split('/')[4])
     console.log(this.props)
    return art }
    }

    

//  handleClick = (event) => {
//     let song = event.target.preview_url;
//     song = new Audio(song)
//     song.play()
//     }
      
    grabArtImage = () => {
      if (`${this.findArtist().images}`==[]){
        return <h3 style={{color:'red', textDecoration: 'underline dashed'}}>No Artist Image</h3>
      } if (`${this.findArtist().images}`.length === 1) {
        return <img src={this.findArtist().images[0].url}                 
        alt={this.findArtist().id}/>;
       } else {
        return <img src={this.findArtist().images[1].url}                 
        alt={this.findArtist().id}/>;
       }     
      }
    
       checkforprops=()=>{
         if(this.props.artists){ this.findArtist() }
       } 
    
     componentDidMount(){
        this.checkforprops()
        let token = this.props.token
        if(token !==undefined){
        this.props.fetchTracks({token})}
        console.log("we mounted!")  
        console.log(this.props.currentUser)      
        }
  
    handleTopTracks = () => {
        if (this.props.loading) {
            return <h2 id='loading-header'>Loading Tracks...</h2>
             } if(this.props.toptracks){
            return <TopTracks currentUser={this.props.currentUser} toptracks={this.props.toptracks} />
          }
      }
     
    
render(){
    
    return(
        
          <div id="artist-div">   
            {document.getElementById('thisDiv') ? document.getElementById('thisDiv').innerHTML = '' : ''}
            <h2 id="artist-title">{this.findArtist() !== undefined ? this.findArtist().name : ''}</h2>
            {this.findArtist() !== undefined ? <div> {this.grabArtImage()}</div> : ''} 
            {this.findArtist() !== undefined ? <div>{this.handleTopTracks()}</div> :''}
            {/*&& this.props.token !== undefined */}
           
          </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      toptracks: state.toptracks,
      loading: state.loading,
      token: state.token,
      currentUser: state.currentUser
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      fetchTracks: (anyProp) => dispatch(fetchTracks(anyProp))
    }
  }



export default connect(mapStateToProps, mapDispatchToProps)(Artist)
