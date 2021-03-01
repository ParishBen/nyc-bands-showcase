import React from 'react';
import { NavLink } from 'react-router-dom';


const NavBar = () => {
  return (
    <div style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '12px' }}>
      <NavLink 
        style={{ marginRight: '10px' }} 
        activStyle={{background: 'darkblue', color: 'white'}}
        to={`/${this.props.token}`}
      >
        Home
      </NavLink>
      <NavLink 
        activStyle={{background: 'darkblue', color: 'white'}}
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