import '../stylesheet/basis.css';
import React from 'react';


class Concert extends React.Component{
    
    constructor(){
        super();
        this.state={
            events: null,
            filteredConcerts: null
        }
    }
 
    componentDidMount(){
        this.ticketMasterFetch()
    }
    
    ticketMasterFetch = () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${this.props.name}&classificationName=music&locale=en-us&size=50&apikey=JcHBGDzcTW1CwZ7zgfznR4koIFNm8zmn`)  
          .then(resp=> resp.json())
          .then(eventObj=> {  
            if(eventObj.error) {
              } else { 
                 if(eventObj._embedded.events.length > 0){
                    this.setState({ events: eventObj._embedded.events })
                }
              }
            })
          .then(() => {
            this.state.events && this.eventsParse(this.state.events)
          })
        .catch(err=> console.log(err))
    }
    


eventsParse = (concerts) => {
  let artname = this.props.name
    if (concerts.length){
     let funcerts = concerts.filter(event => { // filtering every event to see if they have attractions -> that have exact artist name
        if( event._embedded.attractions.find(artist => {
            return artist.name.toLowerCase() === artname.toLowerCase()
          })
            ){
              return event
         }  
     }) 
      this.setState({
          filteredConcerts: funcerts 
        })    
      }     
    }
        

    createList = (list) => {  // Takes in artist's concerts and cuts upcoming events to length of 5. Then lists to DOM. 
        if(list.length){
            if(this.state.filteredConcerts.length > 5){           
                 let listArr = this.sorter(this.state.filteredConcerts) // Sorts the concerts by date
                 listArr = listArr.map( concert => {
                    return <li key={`${concert.name+" - "+concert._embedded.venues[0].city.name}`}><span style={{background:'lightgray', color:'black'}}>Date: {concert.dates.start.localDate} || Concert : {concert.name} || Location: {concert._embedded.venues[0].city ? concert._embedded.venues[0].city.name : concert._embedded.venues[0].address ? concert._embedded.venues[0].address.line1 : 'No City Address Listed'} <a href={concert.url} target={'_blank'} rel={'noreferrer'}> - Buy Tickets</a></span></li> 
                 })
                 listArr.length = 5
                    return listArr
            } else {
                return this.sorter(this.state.filteredConcerts).map( concert => {
                        return <li key={concert.name}><span style={{background:'lightgray', color:'black'}}> Date: {concert.dates.start.localDate} || Concert : {concert.name} || Location: {concert._embedded.venues[0].city ? concert._embedded.venues[0].city.name : concert._embedded.venues[0].address ? concert._embedded.venues[0].address.line1 : 'No City Address Listed'} <a href={concert.url} target={'_blank'} rel={'noreferrer'}> - Buy Tickets</a></span></li> 
                })  
            }
        }
    }
  
    sorter = (eventArr) => {
        if(eventArr.length === 1){
          return eventArr
        }
          let sorted = eventArr.sort(function(a, b){
            if(a.dates.start.localDate < b.dates.start.localDate ){
                return -1
            }
            if(a.dates.start.localDate > b.dates.start.localDate ){
                return 1        
            } else {
                return 0
             }
           })
      return sorted
    }

    render(){
        return(
                <>
                    <h3><span style={{backgroundColor:'GrayText'}}>{this.props.name.toLowerCase().endsWith('s') ? this.props.name+"'" : this.props.name+"'s"} Upcoming Concerts</span></h3>
                    <ul>{this.state.filteredConcerts && this.createList(this.state.filteredConcerts)}</ul>
                </>
              )
    }
}
export default Concert

