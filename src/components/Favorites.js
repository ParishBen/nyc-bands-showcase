import '../stylesheet/basis.css';
import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchFaves} from '../actions/favoritesActions'

class Favorites extends React.Component {
   
    componentDidMount(){
        this.props.currentUser && this.props.fetchFaves(this.props.currentUser) // Redux State grab of Favorites
    }


      
    deleteArtist = (event) => {   // Delete Fetch request to backend & then conducting this.props.fetchFaves()
      let artist = event.target.previousElementSibling.innerHTML.toString() //LOOKS LIKE a href=\"/artists/6K3GiMqOeKI1Z37rtwyEw2\" style=\"
      let first = artist.substring(0,artist.indexOf('ts/')); //All the way up until the / before artist's id
      let delArtist = artist.substring(artist.indexOf(first), artist.indexOf('" style')).split('/')[2] //Grabbing the Unique Artist ID for Delete Request to backend.
      console.log('artist:',artist,'first:',first,'delartist:',delArtist,'THEN', event.target.previousElementSibling.textContent.toString())
       fetch(`http://localhost:9000/${this.props.currentUser.name}/artists/${delArtist}`, {
           method: "DELETE",
           headers: {
               Accept: 'application/json',
               'Content-type': 'application/json'
           }
        })
          .then(() => {
              this.props.fetchFaves(this.props.currentUser)
          })
          .catch(err=> console.log(err))
        }
    
        handleFaveTracks = () => {     // Returns Redux State if loading & still fetching. Or will Render Links to Each Favorite Artist.
            if(this.props.loading){
                return <h2 id='loading-header'>Loading Faves...</h2> 
            }
            if(this.props.favorites && this.props.favorites.length > 0){
               return this.props.favorites.map(artist=> {
                  return <li key={artist.artist_id}><span style={{backgroundColor:'blanchedalmond'}}> <Link to={`artists/${artist.artist_id}`} key={artist.artist_id} style={{marginRight: '5px', border: 'dashed 1pt gold', color: 'brown', fontWeight: 'bold'}}> {artist.name}</Link></span>
                      <button id="DelfavButton" onClick={(event) => this.deleteArtist(event)}>Delete</button>
                      </li>
                }) 
            } 
             else {
                return <p>Go Add Some Favorites!</p>
             }
        }

        render(){
            return(
                <>
                    {document.getElementById('thisDiv') ? document.getElementById('thisDiv').innerHTML = '' : ''}
                    <h1 id="head">NYC FAVES 💛 </h1>
                    <ul id='favorite-list'>{this.handleFaveTracks()}</ul> 
                </>  
            )   
        }
}
 
  const mapStateToProps = state => {     //Need access to Redux Store State of Favorites & Loading
    return {
        favorites: state.favorites,
        loading: state.loading,
        currentUser: state.currentUser
    }
  }
   
  const mapDispatchToProps = dispatch => {  // Dispatch Action To Fetch Backend Favorites & put them into Store State
      return {
      fetchFaves: (currentUser) => dispatch(fetchFaves(currentUser))
      }
   }

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)