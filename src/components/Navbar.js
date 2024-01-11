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
    <div class ="container-fluid" style={{position:'absolute', width:'100%', top: '15px', left: '15px',  textAlign:'left', paddingBottom: '10px', paddingLeft:'3pt' }}>
    <nav class="navbar navbar-expand-lg navbar-dark bg-success" >
      <div class="container-fluid">
       <a class="navbar-brand" href="/home">Home</a>
       <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav"  aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
       </button>
       <div class="collapse navbar-collapse" id="main_nav">
       <ul class="navbar-nav">
         {/* <li class="nav-item active"> <a class="nav-link" href="/home">Home</a> </li> */}
         <li class="nav-item"><a class="nav-link" href="/artists"> Artists </a></li>
         <li class="nav-item"><a class="nav-link" href="/favorites"> Favorites </a></li>
         <li class="nav-item"><a class="nav-link" onClick={logoutBtnClick}> Logout </a></li>
        

         </ul></div></div>
     {/* <div className='navbar2'  style={{position:'absolute', top: '15px', left: '15px',  textAlign:'left', paddingBottom: '10px', paddingLeft:'3pt' }}>
         <NavLink 
           activeStyle={{background: 'darkblue', color: 'white'}}
           style={{ marginRight: '10px' }} 
           to="/artists"
           exact
         >
            Artists
         </NavLink>  
      <span style={{backgroundColor:'floralwhite', borderBottom:'3px solid black'}}>
        <NavLink  */}
  {/* //         style={{ marginRight: '10px' }} 
  //         activeStyle={{background: 'darkblue', color: 'white'}}
  //         to='/home'
  //         exact
  //       >
  //          Home */}
        {/* </NavLink> */}
  {/* //       <NavLink 
  //         activeStyle={{background: 'darkblue', color: 'white'}}
  //         style={{ marginRight: '10px' }} 
  //         to="/artists"
  //         exact
  //       >
  //          Artists
  //       </NavLink>
  //       <NavLink
  //         style={{ marginRight: '10px' }} 
  //         activeStyle={{background: 'darkblue', color: 'white'}}
  //         to="/favorites"
  //         exact
  //       >
  //         Favorites
  //      */} 
  {/* </NavLink> */}
          {/* <button onClick={logoutBtnClick}> 
            Log Out  
          </button> */}
     {/* </span>
    </div>  */}
  </nav>
  </div>
  );
}

export default NavBar;