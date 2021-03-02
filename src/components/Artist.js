import React from 'react';




const Artist = ({match, artists}) => {
    
    const findArtist = () => {
        let art = artists.find(artist=> artist.id === match.params.artistId)
        return art
    }
    
    const grabThemImages = findArtist().images.map((pics) => {
        return <img src={pics.url} alt={findArtist.id} />
    })
    // let art = findArtist()
    // return art.images.map(pic => {
        //     <img src={pic.url} alt={art.id}/>
        // })
        
    // "Authorization": `Bearer ${this.props.token}`
        
          const fetchTopTracks = () => {
              fetch(`${findArtist().href}/top-tracks?market=US`, {
             
                            headers: {
                                "Content-type": "Application/json",
                                Accept: "Application/json"
                            }
                        })
                        .then(resp=> resp.json())
                        .then(res=> {
                           let topTrack1= res.tracks[0].preview_url
                           let song = new Audio (topTrack1)
                            song.play()
                        })
                            //console.log(res.tracks.album.images)})
                        .catch(err=> console.log(err))
                    }
       
    const grabThemImagee = () => {
        return <img src={findArtist().images[1].url}
        alt={findArtist().id} />
    }

const componentDidMount = () => {
            fetchTopTracks()
            console.log("we mounted!")
          
          }

    console.log(match.params.artistId, grabThemImagee(), findArtist())
        return(
            <div>
                <h1> {findArtist().name}</h1>
                <>{grabThemImagee()}</>
                {componentDidMount()}
                  
                

                
            </div>
        )
    }

export default Artist

//  <p>{findArtist().followers} Followers</p>