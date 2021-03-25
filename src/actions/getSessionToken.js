


  export const getSessionToken = () => {
    return (dispatch) => {
        return fetch('http://localhost:9000/token', {
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
            dispatch({type: 'ADD_TOKEN', token: backendToken.token})
            }
          }).catch(err=>console.log(err))
         }
        }
    

 