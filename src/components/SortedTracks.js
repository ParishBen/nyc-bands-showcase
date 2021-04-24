import React from 'react'

export const SortedTracks = ({ toptracks})=> {


    const renderTracks = toptracks && toptracks.map((track, index) => {
        if (track !== undefined)  return   <li key={track.name}> <button key={index} onClick={(event)=> handleClick(event)}>{track.name}</button></li>       // checks for toptracks in this.props Then maps through tracks to create buttons    
     })

     const handleClick = (event) => {
        let truetrack = toptracks.find(track=> track.name === event.target.innerHTML.replace('&amp;', "&"))            // Cleansing some InnerHTML so the Tracks will properly Play.
        console.log(event.target.innerHTML,truetrack.name)
         if (truetrack.preview_url !==undefined){
        let mp3 = truetrack.preview_url 
        let song = new Audio (mp3) 
         song.play()
        } else {
            let mp3 = truetrack.preview_url
            let song = new Audio (mp3)
            song.play()
        } 
     }

    return (
        <>
            <ul>{renderTracks}</ul>
        </>
    )
}