import React from 'react'

export const fetchTracks = (token) => {    //Intakes Token Prop for Spotify Auth. Prior/During the act of Fetch, the ReduxState is 'Loading'. Then all Artists' Tracks are dispatched to Redux State.
    return (dispatch) => {
      let artistId = window.location.href.split('/')[4]
      console.log(token)
        dispatch({ type: 'LOADING_TRACKS' })
          fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,{
            headers: {
                "Content-type": "Application/json",
                Accept: "Application/json",
                "Authorization": `Bearer ${token}`         
              }
            })
          .then(response => {
             return response.json()
          })
          .then(respJSON => {
             dispatch({ type: 'ADD_TRACKS', toptracks: respJSON.tracks })
          })
          .catch(err=> console.log(err))
        }
      }

   