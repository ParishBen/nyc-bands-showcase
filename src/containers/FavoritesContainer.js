import '../stylesheet/basis.css'
import React from 'react';
import Favorites from '../components/Favorites'

const artBackGround = () => {
    let src = document.createElement('img')
       src.id = 'favorites-container-img'
        src.url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTonCJA5PPaQmbuH5l_WYElBQTNeMZs1G1z5y6KkbgEZ4x_CltJz2oxKD9R-vd0sKZ9JtY&usqp=CAU'
        document.querySelector('body').style.background = `url("${src.url}") no-repeat fixed center`
       document.querySelector('body').style.backgroundSize = 'cover'
    }

    

const FavoritesContainer = ({match, artists, token}) => {
        return(            
               <div>
                   {artBackGround()}
                   <Favorites artists={artists} token={token} />
                </div> 
              )              
      }

export default FavoritesContainer
