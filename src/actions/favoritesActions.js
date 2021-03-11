import React from 'react'

export const fetchFaves = () => {
    return (dispatch) => {
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

  