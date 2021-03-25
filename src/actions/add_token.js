
export const addToken = (token) => {
    // console.log(token )           // Dispatch the token argument value to the Redux State 
    return {
      type: 'ADD_TOKEN',
      token 
    };
  };


   