
import '../stylesheet/basis.css';
import React from 'react';
import {connect} from 'react-redux'
import {Route, Link} from 'react-router-dom'
import Artist from './Artist'




 class Home extends React.Component{

    constructor(){
        super();
        this.state= {
            artId: '',
            artTitle: ''
        }
    }

  
      randomFetches(){                          // Will fetch random Artist & display their content to DOM. Displays new Artist each time client visits "Home"
        if(this.props.artists.length >=140){
            
            
              fetch(this.props.artists[Math.floor(Math.random()*140)].href, {
    
            headers: {
              'Content-Type':'application/json',
              Accept:'application/json',
              "Authorization": `Bearer ${this.props.token}`    //  auth given from props=> accesstoken 
            }
          })
          
          .then(resp=> resp.json())
          .then(artist => {
              console.log( artist, artist.images, artist.images.length)
              let imgholder= document.getElementById('thisDiv')
                  let imgSrc;
                  let images= artist.images
                  if( `${images}`.length === 0){
                    this.setState({})
                    this.state.artId = artist.id
                    this.state.artTitle = artist.name
                    return  imgholder.innerHTML+= `<h2>No Artist Images for ${artist.name}</h2>`}
                     // console.log(artist, artist.images, artist.images.length)
                   if (images.length===1){
                        imgSrc = images[0].url;
                   }
                   if (artist.images.length > 1){
                    imgSrc = images[1].url;
                   }
                    let myImg = document.createElement('img')
                    let p = document.createElement('p')
                    p.innerText = "Rad & Random Generated Band Above!"
                    //myImgH2.innerHTML += `<a href= "artists/${artist.id}">${artist.name}</a>`
                    
                      {myImg.id = 'random-image'}
                     {myImg.src= imgSrc}
                     {myImg.alt = artist.name}
                  console.log(imgholder, myImg)
                  if(!document.getElementById('random-image')){
                     imgholder.append( myImg, p)
                    this.setState({artId: artist.id,
                    artTitle: artist.name})
                  }
                 
            }
          ).catch(err=> console.log(err))
         }
       }  
              
        // index = (intake) => this.props.artists.map(e => e.id).indexOf(`${intake.id}`); No longer needed. Now pulling the fetched artist Id from State rather than find it by props.artists[index(fetchedArt)]
       
       

       componentDidMount(){
           for(let i=1; i>0; i--){
           this.randomFetches()
           }
         
       }

     
     
    render(){
        return(
            <div id='Home-Div'>
                {this.props.currentUser && this.props.token ? <p>Welcome {`${this.props.currentUser.name}`}, to NYC Bands Showcase ~ Have fun discovering all this local talent! </p>: <p>Welcome to NYC Bands Showcase ~ Have fun discovering all this local talent!</p>}
                {<div id="thisDiv">{ <Link  token={this.props.token}  to={`/artists/${this.state.artId}`} style={{marginRight: '15px', fontSize: '20pt', fontWeight: 'bold', color:'teal'}}>{`${this.state.artTitle}` }</Link>}{!document.getElementById('random-image') ? this.randomFetches() : ''}</div>}
              
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