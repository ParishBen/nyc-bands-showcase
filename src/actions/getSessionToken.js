


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
            dispatch({type: 'ADD_TOKEN', token: backendToken.token})      // Will replace any Redux Token State from Backend (for refresh purposes)
            }
          }).catch(err=>console.log(err))
         }
        }
    

 