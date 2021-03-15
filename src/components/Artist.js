import '../App.css';
import React from 'react';
import { connect } from 'react-redux';
import TopTracks from './TopTracks'
import {fetchTracks} from '../actions/artistActions'



class Artist extends React.Component{
 

findArtist = () => {
   let art = this.props.artists.find(art=> art.id === window.location.href.split('/')[4])
   console.log(this.props)
    return art
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
    
        
    
     componentDidMount(){
         this.findArtist()
        let token = this.props.token
        this.props.fetchTracks({token})
        console.log("we mounted!")        
        }
  
    handleTopTracks = () => {
        if (this.props.loading) {
            return <h2 id='loading-header'>Loading Tracks...</h2>
             } else {
            return <TopTracks toptracks={this.props.toptracks} />
          }
      }
    
    
render(){
    
    return(
        
          <div id="artist-div">   
            {document.getElementById('thisDiv') ? document.getElementById('thisDiv').innerHTML = '' : ''}
            <h2 id="artist-title">{this.findArtist().name}</h2>
            {this.findArtist() !== undefined ? <div> {this.grabArtImage()}</div> : ''} 
            {this.handleTopTracks()}
          </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      toptracks: state.toptracks,
      loading: state.loading
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      fetchTracks: (anyProp) => dispatch(fetchTracks(anyProp))
    }
  }



export default connect(mapStateToProps, mapDispatchToProps)(Artist)
