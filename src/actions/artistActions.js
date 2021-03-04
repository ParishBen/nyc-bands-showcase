// import nycBands from '../nycBands'

// const properCase = // this goes through the imported list of Bands formed in NYC. Then URI encodes the non-alphabetical characters for the Fetch Request.
// nycBands.map(artist => {
//     return artist.replaceAll(' ','%20').replaceAll("'","%27").replaceAll(":", "%3A")
//   })

//   const codeIntake = () => {
//     if(window.location.href !== 'http://localhost:3000/' || 'http://localhost:3000'){
//      return  window.location.href.split('=')[1]  }  // AFTER login is initiated the Spotify API puts parameters in URL 'code' & 'access token'. This grabs the AccessToken info.
//   }

// export const fetchArtists = () => {
    
//   for (let i=0; i< properCase.length; i++){
//     return (dispatch) => {
//         dispatch({ type: 'LOADING_ARTISTS' })
//         fetch(`https://api.spotify.com/v1/search?q=${properCase[i]}&type=artist`, {
//       headers: {
//           'Content-Type':'application/json',
//            Accept:'application/json',
//            "Authorization": `Bearer ${codeIntake()}`    //  codeIntake=> accesstoken auth
//       }
//      }).then(response=> response.json())
//      .then(artistObjs=> {    // going to put this artist obj(s) response into another function which returns correct artist obj from results
//         if (artistObjs){
//             let foundArtist = artistObjs.artists   // this returns artist(s) item's array.
//         if (foundArtist !== undefined && foundArtist.length){  // if response isn't undef & has any length
//             let realArtist = foundArtist.items.find( artist => artist.name === decodeURI(properCase[i])) // find artist in array of objects with name matching the initial search
//           if (realArtist !== undefined){  // if we have a hit on name matches in the objects & fetch search
//             //artistsObjArr.push(realArtist)  // pushing the artist obj into array (possible for duplicates)
//             dispatch({ type: 'ADD_ARTIST', artist: realArtist})
//           }
//         }
//     }
//           //uniqueArtistsObjs = uniqBy(artistsObjArr, JSON.stringify) // reducer -> will stringify the object & then search & return only unique values in array
      
//      })
     
//     }
//   }
// }
   