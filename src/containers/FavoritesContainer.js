import '../App.css';
import React from 'react';
import Favorites from '../components/Favorites'
import {Route} from 'react-router-dom'
import Artist from '../components/Artist'
//let codeIntake = window.location.split('=')[1]



//let artists = [{name:"Yeah Yeah Yeahs", href:'https://api.spotify.com/v1/artists/3TNt4aUIxgfy9aoaft5Jj2'}]






const FavoritesContainer = ({match, artists, token}) =>  {
     
   

    

        return (

            
               
               `${window.location.href}` === 'http://localhost:3000/favorites' ? <div>
               <Favorites artists={artists} token={token} /></div> : ''
          
      
        )
                
                  
        
    


}

export default FavoritesContainer
// `${window.location.href === "http://localhost:3000/artists/" || "http://localhost:3000/artists"}` ?

//<Route exact path={match.url} render={() => <h3>Click 'Artists' above to get things started</h3> }/>