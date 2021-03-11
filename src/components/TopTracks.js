import React from 'react'


const TopTracks = ({toptracks}) => {
   
    const renderTracks = toptracks.map((track, index) => {
       if (track !== undefined)  return   <li> <button key={index} onClick={(event)=> handleClick(event)}>{track.name}</button></li>
        
    })

const favoriteArtist = (event) => {
    console.log(event.target.innerHTML)
    let trutrack = toptracks[0].artists[0]
    
    console.log(toptracks[0].artists[0], toptracks[0])
        
    fetch('http://localhost:9000/artists', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            Accept:'application/json'
        },
        body: JSON.stringify({
            "name": trutrack.name,
            "artist_id": trutrack.id

        })
    })
    .then(function(){
        if (!document.getElementById('artist-title').innerHTML.includes("💛"))
        document.getElementById('artist-title').innerHTML +="💛" 
    }).then(function(){
        let favbutton = document.getElementById('favButton')
        favbutton.style.background = 'orange'
        favbutton.style.fontWeight = "bold"})
    .catch(err=>console.log(err))
    
}

   const handleClick = (event) => {
        console.log(event.target.innerHTML)
        let trutrack = toptracks.find(track=> track.name === event.target.innerHTML)
       let mp3 = trutrack.preview_url
       if (mp3){
       let song = new Audio (mp3) 
        song.play()
       }else {
           let mp3 = trutrack
           let song = new Audio (trutrack)
           song.play()
       }
    
        // let song = event.target.preview_url;
        // song = new Audio(song)
        // song.play()
    }
    return(
        <div>
            <button id="favButton" onClick={(event) => favoriteArtist(event)}>Favorite</button>
            <h2>Top Tracks</h2>
            <p>Click to preview</p>
        <ul>{renderTracks}</ul>
        </div>
)

}
export default TopTracks