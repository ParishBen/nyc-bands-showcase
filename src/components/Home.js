
import '../stylesheet/basis.css';
import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

 class Home extends React.Component{

    constructor(){
        super();
        this.state= {
            artId: '',
            artTitle: ''
        }
    }

      randomFetches(){  // Will fetch random Artist & display their content to DOM. Displays new Artist each time client visits "Home"
        
          if(this.props.artists.length > 0){
             let num = this.props.artists.length
             fetch(this.props.artists[Math.floor(Math.random() * num)].href, {
                headers: {
                'Content-Type':'application/json',
                Accept:'application/json',
                "Authorization": `Bearer ${this.props.token}`    //  auth given from props=> accesstoken 
                  }
                })
                .then(resp=> resp.json())
                .then(artist => {
                    let imgholder = document.getElementById('thisDiv')
                    let imgSrc;
                    let images = artist.images

                      if ( images.length === 0){
                        imgholder.append( `~No Artist Images for ${artist.name}~`)
                      }
                      if (images.length===1){
                         imgSrc = images[0].url;
                      }
                      if (images.length > 1){
                        imgSrc = images[1].url;
                      }
                        let myImg = document.createElement('img')
                           myImg.id = 'random-image'
                        let p = document.createElement('p')
                           p.innerText = "Rad & Random Generated Band Above!"
                      if(imgSrc != null){
                          myImg.src= imgSrc
                        }
                        myImg.alt = artist.name
                          if((!document.getElementById('random-image') && images.length > 0)){   // IF the image isn't on the DOM yet go ahead & append the image to render.
                            imgholder.append( myImg, p)
                          }
                this.setState({artId: artist.id, // Set the State to hold the Id & name of the Random Artist (for the Link path and title)
                artTitle: artist.name})        
              })
              .catch(err=> console.log(err))
          }
        }
                    
       componentDidMount(){
           this.randomFetches()
       }
      
     checkForImage = setTimeout(() => {
       if(document.getElementById('thisDiv') == null || ((document.getElementById('thisDiv') && !document.getElementById('thisDiv').innerText.includes('~No Artist Images')) && !document.getElementById('random-image')) ){
       this.randomFetches() 
       }
     }, 3000)
     
    render(){
        return(
            <div id='Home-Div'>
                {this.props.currentUser ? <p>Welcome {`${this.props.currentUser.name}`}, to NYC Bands Showcase ~ Have fun discovering all this local talent! </p>: <p>Welcome to NYC Bands Showcase ~ Have fun discovering all this local talent!</p>}
                {<div id="thisDiv">{<Link  token={this.props.token}  to={`/artists/${this.state.artId}`} style={{marginRight: '15px', fontSize: '20pt', fontWeight: 'bold', color:'teal'}}>{`${this.state.artTitle}` }</Link>}</div>}
                <div id='invisible-delay-fetch' style={{display:'none'}}>{this.checkForImage}</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {
   
    currentUser: state.currentUser
  }
}
export default connect(mapStateToProps)(Home)