


  export const getCurrentUser = () => {
      return (dispatch) => {
        fetch('http://localhost:9000/currentuser', {
            credentials: "include",
            headers: {
                "Content-type": 'application/json',
                Accept: 'application/json'
                }
             })
            .then(resp => resp.json())
            .then(user => {
                if(user.error){
                    alert(user.error)
                } else {
                dispatch({type: 'CURRENT_USER', currentUser: user})
                }
             })
          .catch(err=> console.log(err))
      }
    }

   