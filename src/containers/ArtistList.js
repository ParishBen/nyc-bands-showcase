import '../stylesheet/basis.css';
import React from 'react';
import { Link } from 'react-router-dom';

const ArtistList = ({  artists, token }) => {

    let index = (intake) => artists.map(e => e.id).indexOf(`${intake.id}`);    // This finds the Index of the artist put as 'Intake' within the entire state Artist Array based on unique ID.

    const renderArtists = artists.map((artist) => {
        return <Link  token={token} key={artist.id} to={`/artists/${artist.id}`} style={{marginRight: '15px'}}>{artists[index(artist)].name}</Link>    // Link to each Artist is rendered - Route defined in App.js
    })
    
   
        return (
      <div style={{paddingLeft:'4pt'}}>
        {document.getElementById('thisDiv') ? document.getElementById('thisDiv').innerHTML = '' : ''}                  {/*Will empty the Div of Home Page Component if present */}
        <h2 style={{textAlign:'center', textDecoration:'underline'}}>Choose a local NYC artist from the list below</h2>
        {renderArtists}
      </div>
    );   
}

export default ArtistList
