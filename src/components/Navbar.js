import '../stylesheet/basis.css';
import React from 'react';
import { NavLink } from 'react-router-dom';


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
    .then(res=> alert(res.message))  // Upon success alerts User that they have logged out & clears session on backend.
    .then(()=> {   
        window.localStorage.removeItem('access_token')// Clear LocalStorage Token
        window.localStorage.removeItem('Name')
        window.localStorage.removeItem('Email')
        window.location='http://localhost:3000'// Direct Client back to '/' Landing Page
    })   
    .catch(err=> console.log()
  )
}

const NavBar = () => {
  return (
    <div className='navbar'  style={{position:'absolute', top: '15px', left: '15px',  textAlign:'left', paddingBottom: '10px', paddingLeft:'3pt' }}>
      <span style={{backgroundColor:'floralwhite', borderBottom:'3px solid black'}}>
        <NavLink 
          style={{ marginRight: '10px' }} 
          activeStyle={{background: 'darkblue', color: 'white'}}
          to='/home'
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
          to="/favorites"
          exact
        >
          Favorites
        </NavLink>
          <button style={{ marginRight: '10px' }} onClick={logoutBtnClick}> 
            Log Out  
          </button>
      </span>
    </div>
  );
}

export default NavBar;