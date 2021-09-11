  export const getCurrentUser = () => {
      return (dispatch) => {
        fetch('http://localhost:9000/currentuser', {     //Set up backend route to receive currentuser to sessions#get_current_user
        credentials: "include",    
        headers: {
                "Content-type": 'application/json',
                Accept: 'application/json'
                }
             })
            .then(resp => resp.json())
            .then(user => {
                if(user.error){
                    throw new Error (user.error)
                } if(!user.error) {
                dispatch({type: 'CURRENT_USER', currentUser: user})   //Dispatching to Redux the Serialized User data from Backend.
                } 
             })
          .catch(err=> console.log(err))
      }
    }  