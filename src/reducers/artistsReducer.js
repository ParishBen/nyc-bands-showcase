const artistsReducer = (state = { artists: [], loading: false, token: null }, action) => {
    switch(action.type) {
      case 'LOADING_ARTISTS':
        return {
          ...state,
          artists: [...state.artists],
          loading: true
        }
      case 'ADD_ARTIST':
        return {
          ...state,
          artists: [...state.artists, action.artist],
          loading: false
        }
        case 'ADD_TOKEN':
            return {
                ...state,
                token: action.token
            }

      default:
        return state;
    }
 }
   
  export default artistsReducer;