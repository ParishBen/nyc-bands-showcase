import '../stylesheet/basis.css';
import React from 'react';
import { NavLink } from 'react-router-dom';


const NavBar = ({token, logged_in, current_user}) => {
  return (
    <div style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '12px' }}>
      <NavLink 
        style={{ marginRight: '10px' }} 
        activeStyle={{background: 'darkblue', color: 'white'}}
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
       <button style={{ marginRight: '10px' }} 
       
        style={{ marginRight: '10px' }} 
        onClick={logoutBtnClick}
        >
        Log Out
      </button>
    </div>
  );
}

const logoutBtnClick = () => {
  return fetch(`http://localhost:9000/logout`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
})
.then(resp=>resp.json())
.then(message=> alert(message.message))  // Upon success alerts User that they have logged out & clears session on backend.
.then(()=>
window.location='http://localhost:3000')   // Direct Client back to '/' Landing Page
}
export default NavBar;