import React from 'react'

export const fetchTracks = ({token}) => {                       //Intakes Token Prop for Spotify Auth. Prior/During Fetch the State is 'Loading'. Then all Artists' Tracks are dispatched to Redux State.
    return (dispatch) => {
        dispatch({ type: 'LOADING_TRACKS' })
        let artistId = window.location.href.split('/')[4]
        console.log(token, window.location.href.split('/')[4], `https:\/\/api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`)
        fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,{
            headers: {
                "Content-type": "Application/json",
                Accept: "Application/json",
                "Authorization": `Bearer ${token}`         
              }
        }).then(response => {
            return response.json()
          }).then(respJSON => {
            dispatch({ type: 'ADD_TRACKS', toptracks: respJSON.tracks })
          }).catch(err=> console.log(err))
    }
  }

   