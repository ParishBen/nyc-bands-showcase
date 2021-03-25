import '../stylesheet/basis.css';
import React from 'react'
import {connect} from 'react-redux'

const TopTracks = ({toptracks, currentUser}) => {
   
    const renderTracks = toptracks && toptracks.map((track, index) => {
       if (track !== undefined)  return   <li key={track.name}> <button key={index} onClick={(event)=> handleClick(event)}>{track.name}</button></li>       // checks for toptracks in props Then maps through tracks to create buttons
        
    })

const favoriteArtist = (event) => {
    console.log(event.target.innerHTML)
    let trutrack = toptracks[0].artists[0]
    
    console.log(toptracks[0].artists[0], toptracks[0])
        
    fetch(`http://localhost:9000/artists`, {  //http://localhost:9000/users/${currentUser.id}/artists --> When I nest artists under users to only show Current_User info
        method: 'POST',
        headers: {                                                                    // Sends POST to backend end /artists to ADD a Favorite Artist. 
            'Content-Type':'application/json',
            Accept:'application/json'
        },
        body: JSON.stringify({
            "name": trutrack.name,
            "artist_id": trutrack.id

        })
    })
    .then(resp => resp.json())
    .then(message => {
        if(message.error){
            console.log(message, message.error)
            alert(message.error)
        }
    })
    .then(function(){                                                           // DOM CHANGES. For Client purposes -> adding Favorite Heart to Header & also Changing Button Color
        if (!document.getElementById('artist-title').innerHTML.includes("💛"))
        document.getElementById('artist-title').innerHTML +="💛" 
    }).then(function(){
        let favbutton = document.getElementById('favButton')
        favbutton.style.background = 'orange'
        favbutton.style.fontWeight = "bold"})
    .catch(err=>console.log(err))
    
}

   const handleClick = (event) => {
       let trutrack = toptracks.find(track=> track.name === event.target.innerHTML.replace('&amp;', "&"))            // Cleansing some InnerHTML so the Tracks will properly Play.
       //console.log(event.target.innerHTML,trutrack.name)
        if (trutrack.preview_url !==undefined){
       let mp3 = trutrack.preview_url
       
       let song = new Audio (mp3) 
        song.play()
       }else {
           let mp3 = trutrack.href
           console.log(mp3)
           let song = new Audio (mp3)
           song.play()
       } 
    }
    return(
        <div>
            <button id="favButton" onClick={(event) => favoriteArtist(event)}>Favorite</button>                 {/* Button to Add Artist to Favorites*/}
            <h2>Top Tracks</h2>
            <p>Click to preview</p>
        <ul>{renderTracks}</ul>
        </div>
)
    }
const mapStateToProps = state => {
    return {
      token: state.token,                   // Store State Access to Token & The CurrentUser. Future change will Post to  currentUser favorites artists
      currentUser: state.currentUser
    }
  }
export default connect(mapStateToProps)(TopTracks)