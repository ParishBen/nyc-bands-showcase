import React from 'react'

  export const getSessionToken = () => {
    return (dispatch) => {
        return fetch('http://localhost:9000/token', {                // Making GET request to backend for Session Token information. 
            credentials: "include",
            
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
           
          })
          .then(res=> res.json())
          .then(backendToken => {
            if (backendToken.error){
              console.log(backendToken.error)
              alert(backendToken.error)
            } else {
            dispatch({type: 'ADD_SESSION_TOKEN', token: backendToken.token})      // Will replace any Redux Token State from Backend (for refresh purposes)
            }
          }).catch(err=>console.log(err))
         }
        }


        export const setSessionToken = (tok) => {
          let tokenProps = tok && tok != null ? tok : null;
          console.log(tok, tokenProps)
            return (dispatch) => {
              return fetch('http://localhost:9000/token', {
                  credentials: "include",
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },
                  body: JSON.stringify({
                    token: tokenProps
                  })
                })
              .then(res=> res.json())
              .then(backendToken => {
                if (backendToken.error){
                  console.log(backendToken.error, backendToken.details)
                  alert(backendToken.error+<br/>+backendToken.details)
                } else {
                dispatch({type: 'ADD_SESSION_TOKEN', token: backendToken.token})
                }
              }).catch(err=>console.log(err))
            }
          }
    

 