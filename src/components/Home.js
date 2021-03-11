import React from 'react';


const codeIntake = () => {
    if(window.location.href !== 'http://localhost:3000/' || 'http://localhost:3000'){
     return  window.location.href.split('=')[1]  }  // AFTER login is initiated the Spotify API puts parameters in URL 'code' & 'access token'. This grabs the AccessToken info.
  }


export default class Home extends React.Component{

    handleDivIt = () => {
        let theDiv = document.getElementById('thisDiv')
        let theP = <p>Rad {'&'} Random Generated NYC Bands Below. Use the Navbar up top to check out more!</p>
      if ( theDiv.children.length >= 1) {
      theDiv.append(theP)}
      }

      randomFetches(){
        if(this.props.artists.length >=141){
            // let strObj = this.props.artists[Math.floor(Math.random()*this.props.artists.length)]    // pulling object straight from state didn't allow for direct URL fetch so this workaround allowed it
            //   let stringified= JSON.stringify(strObj)
              //console.log(stringified)
            
              fetch(this.props.artists[Math.floor(Math.random()*140)].href, {
                
                // let objHref = stringified.substring(stringified.indexOf("\"href\"\:\"")+8, stringified.indexOf("\",\"id\""))  
                //  fetch(`${objHref}`, {
            headers: {
              'Content-Type':'application/json',
              Accept:'application/json',
              "Authorization": `Bearer ${codeIntake()}`    //  codeIntake=> accesstoken auth
            }
          })
          
          .then(resp=> resp.json())
          .then(artist => {
              //console.log( artist, artist.images, artist.images.length)
              let imgholder= document.getElementById('thisDiv')
                  let imgSrc;
                  if( artist.images !== []){
                     // console.log(artist, artist.images, artist.images.length)
                   if (artist.images.length===1){
                        imgSrc = artist.images[0]
                   }
                   if (artist.images.length > 1){
                    imgSrc= artist.images[1].url}
                
                    let myImg = document.createElement('img')
                    let myImgH2 = document.createElement('h2')
                    let p = document.createElement('p')
                    p.innerText = "Rad & Random Generated Band Above!"
                    myImgH2.innerText = artist.name
                     {myImg.src= imgSrc}
                     {myImg.alt = artist.name}
                  console.log(imgholder, myImg)
                  imgholder.append(myImgH2, myImg, p)}
                else { imgholder.innerText+= "<p>Unable to Grab a Band</p>"
                }
            }
          ).catch(err=> console.log(err))
         }
       }  
              
            
              
       componentDidMount(){
           this.randomFetches()
       }

     componentDidUpdate(){
         this.randomFetches()
     }

    render(){
        return(
            <div id='Home-Div'>
                <p>Welcome to NYC Bands Showcase ~ Have fun discovering all this local talent! </p>
                {<div id="thisDiv"></div>}
                 
                {/* {`${document.getElementById('thisDiv').hasAttribute('h2')}` ? document.getElementById('thisDiv').append(<p>Rad {'&'} Random Generated Band Above!</p>) : ''} */}
                {/* <li>{this.randomImager()}</li> */}
            </div>
        )
    }
}