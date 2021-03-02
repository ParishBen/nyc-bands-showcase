import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Artist from '../components/Artist'

const ArtistList = ({  artists }) => {

    
    // let index = (obj, arr) => {
    //     arr.findIndex(e => e.id === obj.id )
    // }
    let index = (intake) => artists.map(function(e) { return e.id; }).indexOf(`${intake.id}`);

    
    const renderArtists = artists.map((artistId) => {
        return <Link key={artistId.id} to={`/artists/${artistId.id}`} style={{marginRight: '15px'}}>{artists[index(artistId)].name}</Link>
        //console.log(artistId.id + "should be able to access id!")
    })
    
    //console.log(artists)
   const ballin = artists.map((artistId) => {
        return <li>{artistId.name}</li> })
    


      //  <Route path={`artists/:artistId`} render={routerProps => <Artist {...routerProps} artists={artists}  /> }/>
    return (
      <div>

        {renderArtists}

      </div>
    );

    

    
}

export default ArtistList
// <Link key={artistId} to={`/artists/${artistId}`} style={{marginRight: "15px"}}>{artists[artistId-1]}</Link>  );