const artistsReducer = (state = { toptracks: [], loading: false, favorites: [], token: null, currentUser: null }, action) => {
    switch(action.type) {
      case 'LOADING_TRACKS':
        return {
          ...state,
          toptracks: [...state.toptracks],
          loading: true
        }
      case 'ADD_TRACKS':
        return {
          ...state,
          toptracks: action.toptracks,
          loading: false
        }
      case 'LOADING_FAVES':
        return {
          ...state,
          favorites: [...state.favorites],
          loading: true
        }
      case 'ADD_FAVES':
        return {
            ...state,
            favorites: action.favorites,
            loading: false
      }
      case 'ADD_TOKEN':
        return {
          ...state,
          token: action.token
        }
      case 'CURRENT_USER':
        return {
          ...state,
          currentUser: action.currentUser
        }

      default:
        return state;
    }
 }
   
// const catsReducer = (state = { cats: [], loading: false }, action) => {
//   switch(action.type) {
//     case 'LOADING_CATS':
//       return {
//         ...state,
//         cats: [...state.cats],
//         loading: true
//       }
//     case 'ADD_CATS':
//       return {
//         ...state,
//         cats: action.cats,
//         loading: false
//       }
//     default:
//       return state;
//   }
// }
 
// export default catsReducer;
  export default artistsReducer;