import '../stylesheet/basis.css';
import React from 'react';
import { Link } from 'react-router-dom';


const ArtistList = ({  artists, token }) => {

    
    
    let index = (intake) => artists.map(e => e.id).indexOf(`${intake.id}`);    // This finds the Index of the artist put as 'Intake' within the entire state Artist Array based on unique ID.

    
    const renderArtists = artists.map((artistId) => {
        return <Link  token={token} key={artistId.id} to={`/artists/${artistId.id}`} style={{marginRight: '15px'}}>{artists[index(artistId)].name}</Link>    // Link to each Artist Displayed
    })
    
   
        return (
      <div>
        {document.getElementById('thisDiv') ? document.getElementById('thisDiv').innerHTML = '' : ''}
        <h2>Choose a local NYC artist from the list below</h2>
        {renderArtists}

      </div>
    );

    

    
}

export default ArtistList
