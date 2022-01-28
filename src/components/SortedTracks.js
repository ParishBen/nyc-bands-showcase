import React from 'react';

export const SortedTracks = ({ toptracks, handleClick}) => {

         const renderTracks = toptracks && toptracks.map((track, index) => {
            if(track !== undefined)  
              return <li key={track.name}> <button key={index} onClick={(event)=> handleClick(event)}>{track.name}</button></li>       // checks for toptracks in this.props Then maps through tracks to create buttons    
            })
    
         return(
                <>
                 {renderTracks}
                </>
              )
}