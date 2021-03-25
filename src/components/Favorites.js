import '../stylesheet/basis.css';
import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchFaves} from '../actions/favoritesActions'

 class Favorites extends React.Component {
   



componentDidMount(){
    this.props.fetchFaves()          // Redux State grab of Favorites
}




    deleteArtist = (event) => {
        console.log(event.target.previousElementSibling.href.split('/')[4])            // Delete Fetch request to backend & then conducting this.props.fetchFaves()
        let delArtist = event.target.previousElementSibling.href.split('/')[4]
        console.log(delArtist)
     //  let artist = delArtist.substring(0,delArtist.indexOf('Delete'))
       fetch(`http://localhost:9000/artists/${delArtist}`, {
           method: "DELETE",
           headers: {
               Accept: 'application/json',
               'Content-type': 'application/json'
           }
       })
          .then(() => {
              this.props.fetchFaves()
          })
          .catch(err=> console.log(err))
        }
    
        handleFaveTracks = () => {                           // Returns Redux State if loading & still fetching. Or will Render Links to Each Favorite Artist.
            if (this.props.loading) {
                return <h2 id='loading-header'>Loading Faves...</h2>
                 } else {
                     return this.props.favorites.map(artist=> {
                          <li key={artist.artist_id}><Link to={`artists/${artist.artist_id}`} key={artist.artist_id} style={{marginRight: '5px', border: 'dashed 1pt gold', color: 'brown', fontWeight: 'bold'}}> {artist.name} </Link>
                        <button id="DelfavButton" onClick={(event) => this.deleteArtist(event)}>Delete</button> </li> }) 
              }
            }
           

        render(){
            return(
                <div>
                    {document.getElementById('thisDiv') ? document.getElementById('thisDiv').innerHTML = '' : ''}
                    <h1 id="head">NYC FAVES 💛 </h1>
                  
                    {this.props.loading ?         /*Adds Loading message if loading. OR Message to add artists if no favorites. OR Lists All Favorites */
                    <h2 id='loading-header'>Loading Faves...</h2> :
                   this.props.favorites.length > 0 ? this.props.favorites.map(artist=> {
                          return <li key={artist.artist_id}><Link to={`artists/${artist.artist_id}`} key={artist.artist_id} style={{marginRight: '5px', border: 'dashed 1pt gold', color: 'brown', fontWeight: 'bold'}}>{artist.name}</Link>
                        <button id="DelfavButton" onClick={(event) => this.deleteArtist(event)}>Delete</button> </li> }) : 'Go Add Some Favorite Artists!'
                  }
            
                   
                </div>
                )   
             }
        }
 


const mapStateToProps = state => {     //Need access to Store State of Favorites & Loading
    return {
        favorites: state.favorites,
      loading: state.loading
    }
  }
   
  const mapDispatchToProps = dispatch => {             // Dispatch Action To Fetch Backend Favorites & put them into Store State
      return {
      fetchFaves: () => dispatch(fetchFaves())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)