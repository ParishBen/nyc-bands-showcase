import React, { Component } from 'react';
import '../stylesheet/basis.css';

class ThemeSwitcher extends Component {

//   state = { theme: null }
  
//   resetTheme = evt => {
//     evt.preventDefault();
//     this.setState({ theme: null });
//   }
  
//   chooseTheme = (theme, evt) => {
//     evt.preventDefault();
//     this.setState({ theme });
//   }
  
  render() {
  
//     const { theme } = this.state;
//     const themeClass = theme ? theme.toLowerCase() : 'secondary';
    
    return (
        
             <nav class="navbar navbar-expand-lg navbar-dark bg-success">
      <div class="container-fluid">
       <a class="navbar-brand" href="#">Brand</a>
       <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav"  aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
       </button>
       <div class="collapse navbar-collapse" id="main_nav">
       <ul class="navbar-nav">
         <li class="nav-item active"> <a class="nav-link" href="#">Home </a> </li>
         <li class="nav-item"><a class="nav-link" href="#"> About </a></li>
         <li class="nav-item"><a class="nav-link" href="#"> Services </a></li>
         <li class="nav-item dropdown">
            <a class="nav-link  dropdown-toggle" href="#" >  Hover me  </a>
             <ul class="dropdown-menu">
             <li><a class="dropdown-item" href="#"> Submenu item 1</a></li>
             <li><a class="dropdown-item" href="#"> Submenu item 2 </a></li>
             <li><hr/></li>
             <li><a class="dropdown-item" href="#"> Submenu item 3 </a></li>
             </ul>
         </li>
       </ul>
       </div> {/*<!-- navbar-collapse.// -->*/}
      </div> {/*<!-- container-fluid.// -->*/}
     <br/><br/>
     <p>This begins....</p>
     </nav>  
        
/* //       <div className="d-flex flex-wrap justify-content-center position-absolute w-100 h-100 align-items-center align-content-center">
      
//         <span className={`h1 mb-4 w-100 text-center text-${themeClass}`}>{ theme || 'Default' }</span>
        
//         <div className="btn-group">
        
//           <button type="button" className={`btn btn-${themeClass} btn-lg`}>{ theme || 'Choose' } Theme</button>
          
//           <button type="button" className={`btn btn-${themeClass} btn-lg dropdown-toggle dropdown-toggle-split`} data-toggle="dropdown" data-bs-target=".dropdown-menu" aria-haspopup="true" aria-expanded="false">
//             <span className="sr-only">Toggle Theme Dropdown</span>
//           </button>
          
//           <div className="dropdown-menu">
          
//             <a className="dropdown-item" href="#" onClick={e => this.chooseTheme('Primary', e)}>Primary Theme</a>
//             <a className="dropdown-item" href="#" onClick={e => this.chooseTheme('Danger', e)}>Danger Theme</a>
//             <a class="dropdown-item" href="#" onClick={e => this.chooseTheme('Success', e)}>Success Theme</a>
            
//             <div className="dropdown-divider"></div>
            
//             <a className="dropdown-item" href="#" onClick={this.resetTheme}>Default Theme</a>
//           </div>
          
//         </div>
        
//       </div> */
    );
    
  }
  
}

export default ThemeSwitcher;