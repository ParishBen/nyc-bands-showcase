import '../stylesheet/basis.css'
import React from 'react';
import Favorites from '../components/Favorites'

const FavoritesContainer = ({match, artists, token}) =>  {
        return (            
               <div>
               <Favorites artists={artists} token={token} /></div> 
              )              
    }
export default FavoritesContainer
