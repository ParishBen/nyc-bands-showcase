import '../stylesheet/basis.css';
import React from 'react'
import 
{connect} from 'react-redux'
import { SortedTracks } from './SortedTracks';
// ({toptracks, currentUser, token})


class TopTracks extends React.Component {
    sandlot = this.props.toptracks
    candlot = this.props.toptracks.slice()
    
state = {
    btnClass: ''
}

    renderTracks = this.props.toptracks && this.props.toptracks.map((track, index) => {
        if (track !== undefined)  return   <li key={track.name}> <button key={index} onClick={(event)=> this.handleClick(event)}>{track.name}</button></li>       // checks for toptracks in this.props Then maps through tracks to create buttons    
     })



     sorter = () => {
        let sortedArrinp = this.props.toptracks.slice()
        let sortedArr = sortedArrinp.sort(function(a, b){
            if(a.name < b.name){
                return -1
               }
            if(a.name > b.name ){
                return 1
            }
            return 0
            }
        )
    return sortedArr}

// const renderTracks = this.props.toptracks && this.props.toptracks.map((track, index) => {
//     if (track !== undefined)  return   <li key={track.name}> <button key={index} onClick={(event)=> handleClick(event)}>{track.name}</button></li>       // checks for toptracks in this.props Then maps through tracks to create buttons    
//   })

  unSortTheTracks = () => {
      console.log('triggered unSortTheTracks')
    console.log((document.getElementById('alphabetizer').className == 'sorted'))
    let btn =  document.getElementById('alphabetizer')
    if(btn && btn.className == "sorted" ){
        console.log('btn class is sorted--off to unsort')
       
        document.getElementById('alphabetizer').className = 'unsorted' 
        
        document.getElementById('alphabetizer').innerText = 'Alphabetize Tracks!'

        document.getElementById('trackholder').innerHTML = '' 
        // document.getElementById('trackholder').append('ALMOST THERE!')
        // console.log('off to UNsort the tracks', sandlot)
        
        return this.sandlot.map((track, index) => {
        //     return   <li key={track.name}> <button key={index} onClick={(event)=> handleClick(event)}>{track.name}</button></li>       // checks for toptracks in this.props Then maps through tracks to create buttons    
        // })
            let trackLi = document.createElement('li')
            trackLi.key = track.name
            let trackButton = document.createElement('button')
            trackButton.key = index
            trackButton.addEventListener('click', this.handleClick)
            trackButton.innerText = `${track.name}`
            trackLi.append(trackButton)
       return ( document.getElementById('trackholder').append(trackLi))
        }) 
     }}
    
     sortTheTracks = () => {
         console.log('triggered sortTheTracks')
        let btn =  document.getElementById('alphabetizer')
        if(btn && btn.className == "unsorted" || btn && btn.className == '' ){
            console.log('proper btn classname to go sort-offtosort')
        console.log((document.getElementById('alphabetizer').className == 'sorted'))
        console.log('off to sort!')
        if(btn && btn.className !== 'sorted')
        btn.className = 'sorted' 
        if(btn && btn != null)  btn.innerText = 'DEalphabetize Tracks'
         if(document.getElementById('trackholder')) document.getElementById('trackholder').innerHTML = '' 
        let sortedmp3s = this.sorter()
        console.log(sortedmp3s)
           sortedmp3s.map((track, index) => {
        //        return<li key={track.name}> <button key={index} onClick={(event)=>handleClick(event)}>{track.name}</button></li>
        //           // checks for toptracks in this.props Then maps through tracks to create buttons  
        let trackLi = document.createElement('li')
        trackLi.key = track.name
        let trackButton = document.createElement('button')
        trackButton.key = index
        trackButton.addEventListener('click', this.handleClick)
        trackButton.innerText = `${track.name}`
        trackLi.append(trackButton)
   return ( document.getElementById('trackholder').append(trackLi))
      })
    }}

 justChangeTheState = () => {
     console.log('justChangeTheState working')
    let btn = document.getElementById('alphabetizer')
    if ((btn) && this.state.btnClass == '' || this.state.btnClass == 'unsorted'){
        console.log('changing class to sorted')
        btn.className = 'sorted'
        btn.innerText = "DEalphabetize Tracks!"
        this.setState({btnClass : 'sorted'})
    } else {
    console.log('changing to unsorted class')
    btn.className = 'unsorted'
    btn.innerText = "Alphabetize Tracks!"
    this.setState({btnClass: 'unsorted'})
 }
}

    // const sortTheTracks2 = () => {
    //     //console.log('off to sort!')
    //     let btn =  document.getElementById('alphabetizer')
    //     // if( btn && btn.className == "unsorted" || '' ){
    //      btn.className = 'sorted'
    //     btn.innerText = 'DEalphabetize Tracks'
    //     //  document.getElementById('trackholder').innerHTML = '' 
    //     // let sortedmp3s = sorter()
    //     // console.log(sortedmp3s)
    //     //   return sortedmp3s.map((track, index) => {
    //     //        return<li key={track.name}> <button key={index} onClick={(event)=>handleClick(event)}>{track.name}</button></li>
    //               // checks for toptracks in this.props Then maps through tracks to create buttons    
    //     //})
    // }



    // const unSortTheTracks2 = () => {
    //     //  console.log((document.getElementById('alphabetizer').className == 'sorted'), document.getElementById('alphabetizer').className)
    //     let btn =  document.getElementById('alphabetizer')
    //     // if( btn && btn.className == "sorted" ){
    //         btn.className = 'unsorted'
    //         btn.innerText = 'Alphabetize Tracks!'
    // }
            //document.getElementById('trackholder').innerHTML = ''
    //  else {
    //  console.log('off to sort the tracks', this.props.toptracks)
    //      let trackLi = document.createElement('li')
    //      trackLi.key = track.name
    //      let trackButton = document.createElement('button')
    //      trackButton.key = index
    //      trackButton.addEventListener('click', handleClick)
    //      trackButton.innerText = `${track.name}`
    //      trackLi.append(trackButton)
    // return ( document.getElementById('trackholder').append(trackLi))
    //  }) 
    // } 
       
    // console.log(this.props.toptracks,sandlot)
    // }
 
    //  <li key={track.name}> <button key={index} onClick={(event)=> handleClick(event)}>{track.name}</button></li>)) }) 
 

 favoriteArtist = (event) => {
    console.log(event.target.innerHTML)
    let trutrack = this.props.toptracks[0].artists[0]        
    fetch(`http://localhost:9000/artists`, {  //http://localhost:9000/users/${currentUser.id}/artists --> When I nest artists under users to only show Current_User info
        method: 'POST',
        headers: {                                                                    // Sends POST to backend end /artists to ADD a Favorite Artist. 
            'Content-Type':'application/json',
            Accept:'application/json'
        },
        body: JSON.stringify({
            "name": trutrack.name,
            "artist_id": trutrack.id
        })
    })
    .then(resp => resp.json())
    .then(message => {
        if(message.error){
            alert(message.error)
        }
    })
    .then(function(){                                                           // DOM CHANGES. For Client purposes -> adding Favorite Heart to Header & also Changing Button Color
        if (!document.getElementById('artist-title').innerHTML.includes("💛"))
             document.getElementById('artist-title').innerHTML +="💛" 
     })
    .then(function(){
        let favbutton = document.getElementById('favButton')
        favbutton.style.background = 'orange'
        favbutton.style.fontWeight = "bold"
     })
    .catch(err=>console.log(err)) 
  }

    handleClick = (event) => {
       let truetrack = this.props.toptracks.find(track=> track.name === event.target.innerHTML.replace('&amp;', "&"))            // Cleansing some InnerHTML so the Tracks will properly Play.
       console.log(event.target.innerHTML,truetrack.name)
        if (truetrack.preview_url !==undefined){
       let mp3 = truetrack.preview_url 
       let song = new Audio (mp3) 
        song.play()
       } else {
           let mp3 = truetrack.preview_url
           let song = new Audio (mp3)
           song.play()
       } 
    }
     btn = document.getElementById('alphabetizer')
     render(){
    return(
        <div>
            <button id="favButton" onClick={(event) => this.favoriteArtist(event)}>Favorite</button>                 {/* Button to Add Artist to Favorites*/}
             <button id="alphabetizer"onClick={() => this.justChangeTheState() }>Alphabetize Tracks!</button> 
             
            <h2>Top Tracks</h2>
            <p>Click to preview</p>
        {/* <ul id='trackholder'>{this.btn && this.state.btnClass == 'sorted' ?  this.unSortTheTracks() : this.sortTheTracks()}</ul> */}
            {/* <ul id='tracksComponent'>{this.state.btnClass == 'sorted' ? console.log('state currently sorted') && <SortedTracks toptracks = {this.props.toptracks} /> : this.state.btnClass == '' ?  console.log('state not set yet //OR unsorted') && <SortedTracks toptracks = {this.sorter()}/> : this.state.btnClass == 'unsorted' ? console.log('state not set yet //OR unsorted') && <SortedTracks toptracks = {this.sorter()}/>:'' }</ul> */}
            <ul id = 'trackattack'>{this.state.btnClass == "sorted" ? <SortedTracks toptracks = {this.sorter()}/> : <SortedTracks toptracks= {this.props.toptracks}/>}</ul>
        </div>
       )
     }
    }
    
{/* {document.getElementsByTagName('alphabetizer').className == 'sorted' ? unSortTheTracks() : sortTheTracks()} */}
    const mapStateToProps = state => {
        return {
            token: state.token,                   // Store State Access to Token & The CurrentUser. Future change will Post to  currentUser favorites artists
            currentUser: state.currentUser
        }
    }
    export default connect(mapStateToProps)(TopTracks)
    /* <ul>{toptracks ? sortedTracks : ''}</ul> */        /* <ul>{toptracks ? sortedTracks() : ''}</ul> */
