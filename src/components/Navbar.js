import '../App.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

let codeIntake = window.location.href.split('=')[1]  // AFTER login is initiated the Spotify API puts parameters in URL 'code' & 'access token'. This grabs the AccessToken info.

//{`/?access_token=${codeIntake}`}
const NavBar = () => {
  return (
    <div style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '12px' }}>
      <NavLink 
        style={{ marginRight: '10px' }} 
        activeStyle={{background: 'darkblue', color: 'white'}}
        //activeStyle={{background: 'darkblue', color: 'white'}}
        to='/'
        exact
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
      <NavLink
        style={{ marginRight: '10px' }} 
        activeStyle={{background: 'darkblue', color: 'white'}}
        style={{ marginRight: '10px' }} 
        to="/favorites"
        exact
        >
        Favorites
      </NavLink>
    </div>
  );
}

export default NavBar;