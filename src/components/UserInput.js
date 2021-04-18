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



tokenToSession = () => {                       // Sends POST request to backend SessionsController to create session[:token]
    let tokenProps = this.props.token && this.props.token !== null ? this.props.token : null
     if(tokenProps){
     return fetch('http://localhost:9000/token', {
       credentials: "include",
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
       },
       body: JSON.stringify({
         token: tokenProps
       })
     })
     .then(res=> res.json())
     .then(backendToken => {
       if (backendToken.error){
         console.log(backendToken.error)
         alert(backendToken.error)
       } else {
       console.log(backendToken, 'should be json_token', backendToken.token)
       this.setState({sessionToken: backendToken.token})
       }
     }).catch(err=>console.log(err))
    }
   }


handleUserInfoChange(event) {                                // Signing in to Landing Page handling value changes
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  
  handleUserInfoSubmit(event) {                               // Handling Submit of user info to find/create a User in Backend => sets session to user.id
    event.preventDefault();
    //this.props.addBand(this.state.bandName);
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
        // this.setState({
        //   currentUser: user  
        // })
        this.props.getCurrentUser()
        console.log(this.state.currentUser, user)
      }
    })
    .then(() => window.location= "http://localhost:8888/login")
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
    return {          // Access to Token & CurrentUser in Props          
        currentUser: state.currentUser
    }
  }

export default connect(mapStateToProps, {getCurrentUser})(UserInput)