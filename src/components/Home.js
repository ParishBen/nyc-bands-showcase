import React from 'react';
import {connect} from 'react-redux'
import {Route, Link} from 'react-router-dom'
import Artist from './Artist'
const codeIntake = () => {
    if(window.location.href !== 'http://localhost:3000/' || 'http://localhost:3000'){
     return  window.location.href.split('=')[1]  }  // AFTER login is initiated the Spotify API puts parameters in URL 'code' & 'access token'. This grabs the AccessToken info.
  }


 class Home extends React.Component{

    constructor(){
        super();
        this.state= {
            artId: '',
            artTitle: ''
        }
    }

    handleDivIt = () => {
        let theDiv = document.getElementById('thisDiv')
        let theP = <p>Rad {'&'} Random Generated NYC Bands Below. Use the Navbar up top to check out more!</p>
      if ( theDiv.children.length >= 1) {
      theDiv.append(theP)}
      }

      randomFetches(){
        if(this.props.artists.length >=141){
            //let strObj = this.props.artists[Math.floor(Math.random()*(this.props.artists.length-1))]    // pulling object straight from state didn't allow for direct URL fetch so this workaround allowed it
              //let stringified= JSON.stringify(strObj)
              //console.log(stringified)
            
              fetch(this.props.artists[Math.floor(Math.random()*140)].href, {
                
                //let objHref = stringified.substring(stringified.indexOf("\"href\"\:\"")+8, stringified.indexOf("\",\"id\""))
                //console.log(objHref)  
                 //fetch(`${objHref}`, {
            headers: {
              'Content-Type':'application/json',
              Accept:'application/json',
              "Authorization": `Bearer ${this.props.token}`    //  codeIntake=> accesstoken auth
            }
          })
          
          .then(resp=> resp.json())
          .then(artist => {
              //console.log( artist, artist.images, artist.images.length)
              let imgholder= document.getElementById('thisDiv')
                  let imgSrc;
                  let images= artist.images
                  if( images !== []){
                     // console.log(artist, artist.images, artist.images.length)
                   if (images.length===1){
                        imgSrc = images[0].url
                   }
                   if (artist.images.length > 1){
                    imgSrc= images[1].url
                  }
                    let myImg = document.createElement('img')
                    let p = document.createElement('p')
                    p.innerText = "Rad & Random Generated Band Above!"
                    //myImgH2.innerHTML += `<a href= "artists/${artist.id}">${artist.name}</a>`
                    
                    
                     {myImg.src= imgSrc}
                     {myImg.alt = artist.name}
                  console.log(imgholder, myImg)
                  imgholder.append( myImg, p)
                  this.setState({artId: artist.id})
                  this.setState({artTitle: artist.name})
               } else { imgholder.innerText+= "<p>Unable to Grab a Band</p>"
                }
            }
          ).catch(err=> console.log(err))
         }
       }  
              
        index = (intake) => this.props.artists.map(e => e.id).indexOf(`${intake.id}`);
       
       

       componentDidMount(){
           for(let i=1; i>0; i--){
           this.randomFetches()
           }
         
       }

     componentDidUpdate(){
        // for(let i=1; i>0; i--){
        //     this.randomFetches()
        //     }
       
     }
     
    render(){
        return(
            <div id='Home-Div'>
                <p>Welcome to NYC Bands Showcase ~ Have fun discovering all this local talent! </p>
                {<div id="thisDiv">{ <Link  token={this.props.token}  to={`/artists/${this.state.artId}`} style={{marginRight: '15px', fontSize: '20pt', fontWeight: 'bold', color:'teal'}}>{`${this.state.artTitle}` }</Link>}</div>}
                

                {/* {<Link to="/artists/2x9SpqnPi8rlE9pjHBwmSC"></Link>}{`/artists/${artistId.id}`}key={artistId.id} */}
                {/* {`${document.getElementById('thisDiv').hasAttribute('h2')}` ? document.getElementById('thisDiv').append(<p>Rad {'&'} Random Generated Band Above!</p>) : ''} */}
                {/* <li>{this.randomImager()}</li> */}
            </div>
        )
    }
}
export default connect()(Home)