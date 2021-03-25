import React from 'react'

export const fetchFaves = () => {
    return (dispatch) => {                              // Loading phase prior to resolving Fetch & then adding all favorites from backend to Redux Store State.
        dispatch({ type: 'LOADING_FAVES' })
        fetch('http://localhost:9000/artists',{
            headers: {
                "Content-type": "Application/json",
                Accept: "Application/json"          
              }
        }).then(response => {
            return response.json()
          }).then(respJSON => {
            dispatch({ type: 'ADD_FAVES', favorites: respJSON })
          }).catch(err=> console.log(err))
    }
  }

  //http://localhost:9000/users/1/artists   -- when I nest artists under users to only show current_user's favorites