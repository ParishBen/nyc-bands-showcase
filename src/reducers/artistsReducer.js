const artistsReducer = (state = { toptracks: [], loading: false, favorites: [], token: null, sessionToken: null, currentUser: null, token: null }, action) => {
    
  switch(action.type) {
      case 'LOADING_TRACKS':
        return {
          ...state,
          toptracks: [''],                // Loading process for Artist Tracks Load
          loading: true
        }
      case 'ADD_TRACKS':                              // Tracks have loaded and added to Redux State as array of tracks
        return {
          ...state,
          toptracks: action.toptracks,
          loading: false
        }
      case 'LOADING_FAVES':                            //  Loading process of Backend Favorite Artists 
        return {
          ...state,
          favorites: [...state.favorites],
          loading: true
        }
      case 'ADD_FAVES':                 // Favorites have been fetched from Backend & Dispatched into Redux Store State
        return {
            ...state,
            favorites: action.favorites,
            loading: false
      }
      case 'ADD_TOKEN':            // Grabbing Token from URL landing page & Dispatching Value to Redux Store State
        return {
          ...state,
          token: action.token
        }
      case 'ADD_SESSION_TOKEN':            // Grabbing Token from URL landing page & Dispatching Value to Redux Store State
      return {
        ...state,
        sessionToken: action.token
      }
      case 'CURRENT_USER':                // Fetching Current User data from Backend
        return {
          ...state,
          currentUser: action.currentUser
        }
      default:
        return state;
    }
 }

export default artistsReducer;