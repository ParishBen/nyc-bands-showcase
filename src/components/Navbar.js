import React from 'react';
import { NavLink } from 'react-router-dom';

let codeIntake = window.location.href.split('=')[1]  // AFTER login is initiated the Spotify API puts parameters in URL 'code' & 'access token'. This grabs the AccessToken info.


const NavBar = () => {
  return (
    <div style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '12px' }}>
      <NavLink 
        style={{ marginRight: '10px' }} 
        activeStyle={{background: 'darkblue', color: 'white'}}
        to={`/?access_token=${codeIntake}`}
      >
        Home
      </NavLink>
      <NavLink 
        activeStyle={{background: 'darkblue', color: 'white'}}
        style={{ marginRight: '10px' }} 
        to="/artists"
        exact
      >
        Artists
      </NavLink>
    </div>
  );
}

export default NavBar;