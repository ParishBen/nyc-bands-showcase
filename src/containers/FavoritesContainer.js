import '../stylesheet/basis.css'
import React from 'react';
import Favorites from '../components/Favorites'



const FavoritesContainer = ({match, artists, token}) =>  {
                                              // Rendering Favorites Component if URL matches /favorites
        return (            
               
               `${window.location.href}` === 'http://localhost:3000/favorites' ? <div>
               <Favorites artists={artists} token={token} /></div> : '' 
        )
                

}

export default FavoritesContainer
