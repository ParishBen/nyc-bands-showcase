import React from 'react'
import {getCurrentUser} from '../actions/addCurrentUser'
import {connect} from 'react-redux'


class UserInput extends React.Component {

    constructor(){
      super();
      this.state = {
        name:'',
        email: '',
        password: '',
      }
    }


handleUserInfoChange(event) {                                // Signing in to Landing Page handling value changes
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  
  userSerializer = (user) => {
    let currentUser = { 
      name: user.name,
      email: user.email
    }
    return currentUser
  }
  handleUserInfoSubmit(event) {                               // Handling Submit of user info to find/create a User in Backend => sets session to user.id
    event.preventDefault();
    let name = this.state.name;
    let email = this.state.email;
    fetch('http://localhost:9000/login', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      })
    .then(res => res.json())
    .then(user=> {
      if(user.error) {
        alert(user.error)
      } else {
        this.props.getCurrentUser()  // Submits user info to backend & starts a current_user in Session. Then Dispatch the Action Creator function to Redux Store
        console.log(this.props.currentUser, user)
      }
    })
    .then(() => {
    //this.props.stateLogin()
    localStorage.setItem('Name', name)
    localStorage.setItem('Email',email)
    window.location= "http://localhost:8888/login"}) // Transports to Express Server on 8888 which is the defined callback route for Spotify to grant Access Token & route back to localhost:3000
    .catch(err=> alert(err))
    this.setState({
      name: '',
      email: '',
      password: ''
    });
  }


render() {
    return (
      <div>
              <p>Hey there, please sign in/up below!</p>
            <form onSubmit={(event) => this.handleUserInfoSubmit(event)} style={{border: '1pt solid white'}}>
          <label>Email: &nbsp; </label>
          <input
            type="text" name="email"
            value={this.state.email}
            onChange={(event) => this.handleUserInfoChange(event)} /><br/>
            <label>Name:&nbsp; </label>
            <input
            type="text" name="name"
            value= {this.state.name}
            onChange={(event)=> this.handleUserInfoChange(event)} /><br/>
            <label>Password:</label>
            <input
            type="password" name="password"
            value= {this.state.password}
            onChange={(event)=> this.handleUserInfoChange(event)} />
          <input type="submit" />
        </form>
        </div>)
    }
  }

const mapStateToProps = state => {          
    return {          // Access to  CurrentUser in Props          
        currentUser: state.currentUser
    }
  }

export default connect(mapStateToProps, {getCurrentUser})(UserInput)