
export const fetchFaves = (currentusr) => {
    return (dispatch) => {                              // Loading phase prior to resolving Fetch & then adding all favorites from backend to Redux Store State.
        dispatch({ type: 'LOADING_FAVES' })
        fetch(`http://localhost:9000/${currentusr.name}/artists`,{
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

