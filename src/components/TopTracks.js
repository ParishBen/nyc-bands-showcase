import '../stylesheet/basis.css';
import React from 'react'
import {connect} from 'react-redux'
import { SortedTracks } from './SortedTracks';


class TopTracks extends React.Component {
    
    state = {
        btnClass: '',
        songPlaying: false
    }

    renderTracks = this.props.toptracks && this.props.toptracks.map((track, index) => {
        if (track !== undefined)  return   <li key={track.name}> <button key={index} onClick={(event)=> this.handleClick(event)}>{track.name}</button></li>       // checks for toptracks in this.props Then maps through tracks to create buttons    
     })



     sorter = () => {
        let unSortedArrInp = this.props.toptracks.slice();
        console.log(unSortedArrInp);
        
        let sortedArr = unSortedArrInp.sort(function(a, b){
            let strA =  a.name+"";
            let strB =  b.name+"";
            
            if(strA.toLowerCase() < strB.toLowerCase()){
                return -1
               }
            if(strA.toLowerCase() > strB.toLowerCase() ){
                return 1
            }
            return 0
            }
        )
    return sortedArr
   }

   fortySecondPlayTime = () => {
    if(!this.state.songPlaying){
        return true;
    } else {
        setTimeout(() => {
            console.log("in timeout...")
            this.setState({songPlaying:false})
            }, 40000)
    return false;
    }
   }


  justChangeTheState = () => {
    let btn = document.getElementById('alphabetizer')
    if ( this.state.btnClass === '' || this.state.btnClass === 'unsorted'){
        btn.className = 'sorted'
        btn.innerText = "Unsort Tracks!"
        this.setState({btnClass : 'sorted'})
    } else {
        btn.className = 'unsorted'
        btn.innerText = "Sort Tracks!"
          this.setState({
              btnClass: 'unsorted'
          })
    }
  }

 favoriteArtist = (event) => {
    fetch(`http://localhost:9000/artists`, {  //http://localhost:9000/users/${currentUser.id}/artists --> When I nest artists under users to only show Current_User info
        method: 'POST',
        headers: {                              // Sends POST to backend end /artists to ADD a Favorite Artist. 
            'Content-Type':'application/json',
            Accept:'application/json'
        },
        body: JSON.stringify({
            "name": this.props.artistName,
            "artist_id": this.props.artistId,
            "username": this.props.currentUser.name
        })
    })
    .then(resp => resp.json())
    .then(message => {
        if(message.error){
             return alert(message.error)
        } else {
            let favbutton = document.getElementById('favButton')                                                       
              if (!document.getElementById('artist-title').innerHTML.includes("💛")){ // DOM CHANGES. For Client purposes -> adding Favorite Heart to Header & also Changing Button Color
                     document.getElementById('artist-title').innerHTML +="💛" 
              }
                favbutton.style.background = 'orange'
                favbutton.style.fontWeight = "bold"        
             }
         })
    .catch(err=>console.log(err)) 
  }

    handleClick = (event) => {
        let truetrack = this.props.toptracks.find(track=> track.name === event.target.innerHTML.replace('&amp;', "&"))            // Cleansing some InnerHTML so the Tracks will properly Play.
        if (truetrack.preview_url !==undefined){
            let mp3 = truetrack.preview_url 
            let song = new Audio (mp3)     
                if(!this.state.songPlaying){
                song.play()
                this.setState({songPlaying:true});
                setTimeout(()=> {
                    this.setState({songPlaying:false})
                },31000)  
                }
            }
        //     } else {
        //     let mp3 = truetrack.preview_url
        //     let song = new Audio (mp3)
        //     song.play()
        //     this.setState({songPlaying:true});
        // } 
    }

     render(){
        return(
          <div>
            <button id="favButton" onClick={(event) => this.favoriteArtist(event)}>Favorite</button>                 {/* Button to Add Artist to Favorites*/}
             <button id="alphabetizer" onClick={() => this.justChangeTheState() }>Sort Tracks!</button>        {/* Button to Alphabetize/Unsort Tracks*/}    
              <h2><span style={{backgroundColor: 'gray'}}>Top Tracks</span></h2>
             <p>Click to preview</p>
            <ul id = 'tracklister'>{this.state.btnClass === "sorted" ? <SortedTracks toptracks = {this.sorter()} handleClick= {this.handleClick}/> : <SortedTracks toptracks= {this.props.toptracks} handleClick= {this.handleClick}/>}</ul>
         </div>
       )
     }
}
    
    const mapStateToProps = state => {
        return {
            token: state.token,                   // Store State Access to Token & The CurrentUser. Future change will Post to  currentUser favorites artists
            currentUser: state.currentUser
        }
    }
    export default connect(mapStateToProps)(TopTracks)