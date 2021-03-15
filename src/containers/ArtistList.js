import '../App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Artist from '../components/Artist'

const ArtistList = ({  artists, token }) => {

    
    // let index = (obj, arr) => {
    //     arr.findIndex(e => e.id === obj.id )
    // }
    let index = (intake) => artists.map(e => e.id).indexOf(`${intake.id}`);

    
    const renderArtists = artists.map((artistId) => {
        return <Link  token={token} key={artistId.id} to={`/artists/${artistId.id}`} style={{marginRight: '15px'}}>{artists[index(artistId)].name}</Link>
        //console.log(artistId.id + "should be able to access id!")
    })
    
   
    


      //  <Route path={`artists/:artistId`} render={routerProps => <Artist {...routerProps} artists={artists}  /> }/>
    return (
      <div>
        {document.getElementById('thisDiv') ? document.getElementById('thisDiv').innerHTML = '' : ''}
        <h2>Choose a local NYC artist from the list below</h2>
        {renderArtists}

      </div>
    );

    

    
}

export default ArtistList
// <Link key={artistId} to={`/artists/${artistId}`} style={{marginRight: "15px"}}>{artists[artistId-1]}</Link>  );