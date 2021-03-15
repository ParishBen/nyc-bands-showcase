import '../App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import ArtistList from './ArtistList';
import Artist from '../components/Artist'

const componentDidMount = () => {
      destroyDiv()  
}
const destroyDiv = () => {
        document.getElementById('thisDiv').remove()
}
const ArtistContainer = ({match, artists, token}) =>  {
        
         

        return (
                
               
                        `${window.location.href}` === 'http://localhost:3000/artists' ?  <div> {document.getElementById('thisDiv') ? document.getElementById('thisDiv').innerHTML = '': ''}
                        <ArtistList artists={artists} token={token} /> 
                          </div> :
                         <div><Route path={`${match.url}/:artistId`} render={routerProps => <Artist {...routerProps} artists={artists} token={token}  /> }/>
                         </div>                  
                 )             
        
}

export default ArtistContainer
