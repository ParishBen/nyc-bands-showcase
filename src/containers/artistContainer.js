import React from 'react';
import { Route } from 'react-router-dom';
//let codeIntake = window.location.split('=')[1]
import ArtistList from './ArtistList';
import Artist from '../components/Artist'


//let artists = [{name:"Yeah Yeah Yeahs", href:'https://api.spotify.com/v1/artists/3TNt4aUIxgfy9aoaft5Jj2'}]






const ArtistContainer = ({match, artists, token}) =>  {
    // constructor(){
        //     super();
        //     this.state={
            //         artistTracks: []
            //     }
            // }

            // componentDidMount(){
            //     this.topTrackFetcher()
            //     this.artistfetchagain()
            //     console.log("did trackFetcher in container")
            // }

           
        
    const artistfetchagain= () => {
        fetch(artists[0].href, {
            headers: {
                "Content-type": "Application/json",
                Accept: "Application/json",
                "Authorization": `Bearer ${this.props.token}`
            }
        })
        .then(resp=> resp.json())
        .then(res=> {
            console.log(res.images)
        })
        .catch(err=> console.log(err))
    }
    
    // const topTrackFetcher = () => {
    //     //artists.forEach( art => {
    //         `console.log(artists[100], artists[100].href)
    //         fetch(`${artists[100].href}/top-tracks?market=US`, {
    //             headers: {
    //                 "Content-type": "Application/json",
    //                 Accept: "Application/json",
    //                 "Authorization": `Bearer ${this.props.token}`
    //             }
    //         })
    //         .then(resp=> resp.json())
    //         .then(res=> {
    //            let topTrack1= res.tracks[0].preview_url
    //            let song = new Audio (topTrack1)
    //             song.play()
    //         })
    //             //console.log(res.tracks.album.images)})
    //         .catch(err=> console.log(err))
    //     }
    
        
    

    // player(){
    //     fetch(`${artists[0].href}`, {
    //         headers: {
    //             "Content-type": "Application/json",
    //             "Accept": "Application/json"
                
                
    //         }
    //     })
    //     .then(resp=> resp.json())
    //     .then(res=> {
    //         let song = new Audio (res)
    //        song.play()
    //         console.log(res)
    //     })
    //     .catch(err=> console.log(err))
    // }


      
   

    

        return (

            
                
               `${window.location.href}` === 'http://localhost:3000/artists' ?  <div> {document.getElementById('thisDiv') ? document.getElementById('thisDiv').innerHTML = '': ''}
               <ArtistList artists={artists} token={token} /> 
                 </div> :
                <div><Route path={`${match.url}/:artistId`} render={routerProps => <Artist {...routerProps} artists={artists} token={token}  /> }/>
                </div>
          
      
              
                
                  // Adding code to show a message to the user to select a movie if they haven't yet
                  
        )
    


}

export default ArtistContainer
// `${window.location.href === "http://localhost:3000/artists/" || "http://localhost:3000/artists"}` ?

//<Route exact path={match.url} render={() => <h3>Click 'Artists' above to get things started</h3> }/>