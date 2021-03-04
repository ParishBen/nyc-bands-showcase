import React from 'react';

let imgArr=[];
console.log(imgArr)

const codeIntake = () => {
    if(window.location.href !== 'http://localhost:3000/' || 'http://localhost:3000'){
     return  window.location.href.split('=')[1]  }  // AFTER login is initiated the Spotify API puts parameters in URL 'code' & 'access token'. This grabs the AccessToken info.
  }


export default class Home extends React.Component{

    randomFetches(){
    //    let k=10
    //     while(k>0){
             //fetch(`${this.props.artists[Math.floor(Math.random()*140)]}`.href, {
                fetch(`${this.props.artists[5]}`.href, {

                headers: {
                    'Content-Type':'application/json',
                     Accept:'application/json',
                     "Authorization": `Bearer ${codeIntake()}`    //  codeIntake=> accesstoken auth
                }
               })
            
            .then(resp=> resp.json())
            .then(artist => {
                    imgArr.push(artist.images[1].url)
                    console.log(artist)
            }).catch(err=> console.log(err))
        
        // } 
        // k--
    }

  

    randomImager(){
        imgArr.forEach(imgSr => {
            return <img src={imgSr} alt={imgSr}/>
        })
    }
     

    render(){
        {this.randomFetches()}
        return(
            <div>
                <p>SUP?!</p>

                <li>{this.randomImager()}</li>
            </div>
        )
    }
}