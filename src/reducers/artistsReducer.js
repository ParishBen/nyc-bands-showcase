const artistsReducer = (state = { toptracks: [], loading: false }, action) => {
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
        // case 'ADD_TOKEN':
        //     return {
        //         ...state,
        //         token: action.token
        //     }

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