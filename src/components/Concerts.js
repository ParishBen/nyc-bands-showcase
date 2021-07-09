import '../stylesheet/basis.css';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Concert extends React.Component{

    
    constructor(){
        super();
        this.state={
            events: null,
            filteredConcerts: null
        }
    }
    
    
    componentDidMount(){
        this.newfetchmcgee()
    }
    
newfetchmcgee = () => {
    console.log(this.props.name)
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${this.props.name}&classificationName=music&locale=en-us&size=50&apikey=JcHBGDzcTW1CwZ7zgfznR4koIFNm8zmn`)
        
    .then(resp=> resp.json())
        .then(eventObj=> {  
            if(eventObj.error) {
                console.log(eventObj.error)
                 } else { 
                  if(eventObj._embedded.events.length > 0){
                      this.setState({ events: eventObj._embedded.events })
                // eventObj._embedded.events[0]._embedded.venues[0].name,
                // city: eventObj._embedded.events[0]._embedded.venues[0].city.name,
                // country: eventObj._embedded.events[0]._embedded.venues[0].country.name,
                // url: eventObj._embedded.events[0].url
               console.log(eventObj, this.state.events)
            }}
        })
        .then(() => {
            this.state.events && this.eventsParse(this.state.events)
        })
        .catch(err=> console.log(err))
    }
    


eventsParse = (concerts) => {
  let artname = this.props.name
    if (concerts.length){
     let funcerts = concerts.filter(event => {
          if(event._embedded.attractions){
             if( event._embedded.attractions.find(artist => {
                return artist.name.toLowerCase() == artname.toLowerCase()
               }))
              {
                  console.log(event)
                  return event
                }  
            }
            //return funcerts
        }) 
        console.log( funcerts, concerts)
        this.setState({filteredConcerts: funcerts }) //funcerts
        // let truConcerts = element._embedded.attactions.filter(artist => {
        //     return artist.name.toLowerCase() == artname.toLowerCase()
     }     
    }
        //return truConcerts
    //});

    createList = (list) => {
        //this.state.filteredConcerts && console.log(this.state.filteredConcerts.length)
        if (list.length){
            console.log('got list filtered certs')
            if(this.state.filteredConcerts.length > 5){
                console.log('list is longer than 5')
           
                 let listArr = this.sorter(this.state.filteredConcerts)
                 listArr = listArr.map( concert => {
                    return <li key={concert.name}><span style={{background:'lightgray', color:'black'}}>Date: {concert.dates.start.localDate} || Concert : {concert.name} || Location: {concert._embedded.venues[0].city ? concert._embedded.venues[0].city.name : concert._embedded.venues[0].address ? concert._embedded.venues[0].address.line1 : 'No City Address Listed'} <a href={concert.url} target={'_blank'} rel={'noreferrer'}> - Buy Tickets</a></span></li> 
                    //return <li key={this.state.filteredConcerts[i].name}>Date: {this.state.filteredConcerts[i].dates.start.localDate} || Concert : {this.state.filteredConcerts[i].name} || Location: {this.state.filteredConcerts[i]._embedded.venues[0].city ? this.state.filteredConcerts[i]._embedded.venues[0].city.name : this.state.filteredConcerts[i]._embedded.venues[0].address ? this.state.filteredConcerts[i]._embedded.venues[0].address.line1 : 'No City Address Listed'} <a href={this.state.filteredConcerts[i].url} target={'_blank'} rel={'noreferrer'}> - Buy Tickets</a></li> 
                 })
                 listArr.length = 5
                 return listArr
                }
            // let concertList =  this.state.filteredConcerts[i]
            // console.log('concertListn but its not going through', concertList, i)
            // }   
        //} 
       else {
        let count = this.state.filteredConcerts.length;
        //for(let i=0; i<count; i++){
            while (count > 0 ){
            console.log('in list less than 5!', count)
          //let list = this.state.filteredConcerts[i] 
           //console.log(list)
           count--
             return  this.sorter(this.state.filteredConcerts).map( concert => {
             return <li key={this.state.filteredConcerts[count].name}><span style={{background:'lightgray', color:'black'}}> Date: {concert.dates.start.localDate} || Concert : {concert.name} || Location: {concert._embedded.venues[0].city ? concert._embedded.venues[0].city.name : concert._embedded.venues[0].address ? concert._embedded.venues[0].address.line1 : 'No City Address Listed'} <a href={concert.url} target={'_blank'} rel={'noreferrer'}> - Buy Tickets</a></span></li> 

            })
        } 
       }
    }
}
  
sorter = (eventArr) => {
    if (eventArr.length === 1){
        return eventArr
 }
   let sorted = eventArr.sort(function(a, b){
        if(a.dates.start.localDate < b.dates.start.localDate ){
            return -1
        }
        if (a.dates.start.localDate > b.dates.start.localDate ){
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
            <h3>Upcoming Concerts</h3>
            {/* {this.state.events && console.log( this.eventsParse(this.state.events))} */}
           <ul>{ this.state.filteredConcerts && this.createList(this.state.filteredConcerts)}</ul>
        </>
        )
    }
}
export default Concert

// // this.state.city && this.state.city, this.state.country && this.state.country)}
    /* //* Venue: {this.state.event && this.state.event  ? this.state.event : 'NO CONCERT SCHEDULED'} City: { this.state.city && this.state.city  ? this.state.city : 'City Not Listed'} Country: {this.state.country && this.state.country ? this.state.country : 'Country Not Listed'}<a href={this.state.url} target="_blank" rel="noopener noreferrer">Tickets</a> */ 