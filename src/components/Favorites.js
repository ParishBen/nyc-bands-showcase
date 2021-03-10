import React from 'react'
import { Link, Route } from 'react-router-dom';
// import Artist from './Artist'

export default class Favorites extends React.Component {
    constructor(){
        super();
        this.state= {
            stateOfFaves: []
        }
    }
//      //delBtn = <button id="delBtn" onClick={(event) => this.deleteArtist(event)}>Delete</button>

componentDidUpdate(){
    // this.faveFetcher()
    //this.meshTogether(this.state.stateOfFaves)

    
}
componentDidMount(){
    this.faveFetcher()
}


faveFetcher(){
    fetch('http://localhost:9000/artists', {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    })
    .then(resp=> resp.json())
    .then(res=> {
        let FaveArr = [];
        res.map(fave=> {
   // let li = document.createElement('li')
   //// let anc =  document.createElement('a')
////   let href =  document.createElement('href')
// //            li.innerText = fave.name
            //li.innerHTML += `<a href=favorites/${fave.artist_id}>${fave.name}</a> `
   ////href.innerHTML = fave.name
            ////anc.href = fave.name
            console.log(fave)
            // let delBtn = document.createElement('button')
            // delBtn.innerHTML = "Delete"
            // delBtn.addEventListener('click', this.deleteArtist)
            // li.appendChild(delBtn)
            // if(!document.getElementById('faveList').textContent.includes(fave.name)){
            // document.getElementById('faveList').append(li)}
 FaveArr.push(fave)
this.setState({
    stateOfFaves: FaveArr
}, console.log(FaveArr))
        })
    })
    
    .catch(err=> console.log(err))
}

    deleteArtist= (event) => {
        console.log(event.target.previousElementSibling.href.split('/')[4])
        let delArtist = event.target.previousElementSibling.href.split('/')[4]
        console.log(delArtist)
     //  let artist = delArtist.substring(0,delArtist.indexOf('Delete'))
       fetch(`http://localhost:9000/artists/${delArtist}`, {
           method: "DELETE",
           headers: {
               Accept: 'application/json',
               'Content-type': 'application/json'
           }
       }).then(function(){
             //this.faveFetcher()
            console.log('deleted success')})
          .then(() =>
              this.faveFetcher()
          )
          
          .catch(err=> console.log(err))
        }
    
        index = (intakeId) => this.props.artists.map(e => e.id).indexOf(`${intakeId}`);
       
    //   meshTogether = (hey) => {
    //     //   let len = hey.length;
    //     // while (len > 0){
    //         hey.map(artist => {
    //    return <Link to={"favorites"/`${artist.artist_id}`} style={{marginRight: '15px'}}> {this.state.stateOfFaves[this.index(`${artist.artist_id}`)]}</Link> 
      
    //         })
    //         // len--
    //     }
    
      

        render(){
            return(
                <div>
             {document.getElementById('thisDiv') ? document.getElementById('thisDiv').innerHTML = '' : ''}
           
            <h1 id="head">NYC FAVES 💛 </h1>
            {this.state.stateOfFaves.length > 0 ? this.state.stateOfFaves.map(artist=> {
                return <li><Link to={`artists/${artist.artist_id}`} style={{marginRight: '5px', border: 'dashed 1pt gold'}}>{artist.name}</Link>
                <button id="DelfavButton" onClick={(event) => this.deleteArtist(event)}>Delete</button> </li>  
            }):''}
             {/* <div id='dived'>{this.meshTogether(this.state.stateOfFaves)}</div> */}
             {/* <ul id='faveList'></ul> */}
            {/* <Route path={`favorites/:artistId`} render={routerProps => <Artist {...routerProps} artists={this.props.artists} token={this.props.token}  /> */}
            {/*this.props.artists[this.index(`${artist.artist_id}`)].name*/}
        </div>
        )
    }
}