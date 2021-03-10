import React from 'react';
import { connect } from 'react-redux';
import TopTracks from './TopTracks'




class Artist extends React.Component{
    constructor(){
        super()
        this.state = {
            toptracks: []
        }
    }
// = ({match, artists, token}) => {

     findArtist = () => {
   let art = this.props.artists.find(art=> art.id === window.location.href.split('/')[4])
   console.log(this.props)
    return art
    }

    

 handleClick = (event) => {
    let song = event.target.preview_url;
    song = new Audio(song)
    song.play()
}

fetchTopTracks1 = () => {
        
    fetch("https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl", {
        headers: {
            "Content-type": "Application/json",
            Accept: "Application/json",
            "Authorization": `Bearer ${this.props.token}`
        },
    })
    .then(resp=> resp.json())
    .then(res=> {
        console.log(res.album, res.album.href)
        this.setState({ 
            toptracks: this.state.toptracks.concat( res.album.href)
         })
         }).catch(err=> console.log(err))
    }

//  trackRenderer = () => {
//      let myArr = [];
//      myArr = this.state.toptracks;

//     console.log(myArr)
//     if(this.state.toptracks.length > 0){
//     this.state.toptracks.map(track => {
        
        
//        let but= <button onClick={(event)=> this.handleClick(event)}>{track.name}</button>
        
//         return but
//     }
//     )}
// }
     fetchTopTracks = () => {
        
        fetch(`${this.findArtist().href}/top-tracks?market=US`, {
            
                            headers: {
                                "Content-type": "Application/json",
                                Accept: "Application/json",
                                "Authorization": `Bearer ${this.props.token}`
                            }
                        })
                        .then(resp=> resp.json())
                        .then(res=> {
                           
                            console.log(res)
                           this.setState({
                               toptracks: res.tracks
                            })
                            // toptrackerarray.push(res.tracks)
                            // TopTracksArr.push(res.tracks)
                            // console.log(toptrackerarray)
                            // let buttonizr = toptrackerarray[0].map(track=> {
                            //     return <button onClick={(event)=> this.handleClick(event)}>{track.name}</button>
                            //  })
                            //  return buttonizrarr.push(buttonizr)
                            //  this.trackRenderer(TopTracksArr)
                            //  console.log(buttonizrarr)
                        //    let song = new Audio (topTrack1)
                        //     song.play()
                        })
                        .catch(err=> console.log(err))
                        
                    }

                    
    
       
                    grabThemImagee = () => {
        //console.log(this)
        return <img src={this.findArtist().images[1].url}
            alt={this.findArtist().id} />;
        }
        
        componentDidUpdate(){
            //this.trackRenderer()
            // document.getElementById('artist-div').innerHTML += this.trackRenderer()
        //`${this.state.toptracks[0].name}`
    }
    
     componentDidMount(){
         this.findArtist()
        this.fetchTopTracks()
        this.fetchTopTracks1()
        console.log("we mounted!")
        //console.log(this.trackRenderer())
        
       // console.log(this.fetchTopTracks())
    }
    //  checkcheckExist = () => {
        //      let interval = setInterval(function() {
            //     if (this.state.toptracks.length) {
                //        console.log("Exists!");
    //        clearInterval(this.interval);
    //     }
    //  }, 10000)
    // }
    
render(){
    
    return(
                     <div id="artist-div">
                         
                    <h2 id="artist-title">{this.findArtist().name}</h2>
                   {this.findArtist() !== undefined ? <div> {this.grabThemImagee()}</div> : ''} 
                   <TopTracks toptracks={this.state.toptracks}/>
            </div>
        )
            //<button onClick={(event)=> this.handleClick(event)}>{track.name}</button>)
    }
}
//     };
//   };
const mapStateToProps = ({toptracks }) => ({toptracks})


export default connect(mapStateToProps)(Artist)



//  <p>{findArtist().followers} Followers</p> 
//     {this.componentDidMount()}
//     {this.fetchTopTracks()}
//     <h1> {this.findArtist().name}</h1>
//     <div>{this.grabThemImagee()}</div>
//      {this.CmonMan}
//        <div> {buttonizrarr}</div>
//     <div>{"bullshit"}</div>
//     <div>{this.onloadeddata()}</div> 
// {console.log(this.props.token, this.props.artists)}



// {/* <h3>HI ARTIST {`${this.props.token}`}</h3>   
//  <ul><li>{this.trackRenderer()}</li></ul>
// {console.log( this.trackRenderer())} */}
// {/* {this.state.toptracks.length >=1 ? `${this.state.toptracks.map(track=> <li>{track.name}</li>)}` : <div>No artists tracks in state</div>}  */}
// <ul>{this.trackRenderer()}</ul>
//  mapStateToProps = (state) => {
//         return {
//           token: state.token