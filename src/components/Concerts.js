import '../stylesheet/basis.css';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Concert extends React.Component{

    
    constructor(){
        super();
        this.state={
            event: '',
            city: '',
            country: ''
        }
    }

    

componentDidMount(){
    this.newfetchmcgee()
}

    newfetchmcgee = () => {
        console.log(this.props.name)
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${this.props.name}&classificationName=music&locale=en-us&apikey=JcHBGDzcTW1CwZ7zgfznR4koIFNm8zmn`)
   
    .then(resp=> resp.json())
            .then(eventObj=> {  
              if(eventObj.error) {
                console.log(eventObj.error)
              }   else { 
                this.setState({ event: eventObj._embedded.events[0]._embedded.venues[0].name,
                city: eventObj._embedded.events[0]._embedded.venues[0].city.name,
                country: eventObj._embedded.events[0]._embedded.venues[0].country.name,
                url: eventObj._embedded.events[0].url })
                console.log(eventObj)
            }})
                .catch(err=> console.log(err))
              }

    render(){
        return(
        <>
            <h3>Concert Lineup</h3>
            {console.log(this.state.event && this.state.event, this.state.city && this.state.city, this.state.country && this.state.country)}
            Venue: {this.state.event && this.state.event  ? this.state.event : 'NO CONCERT SCHEDULED'} City: { this.state.city && this.state.city  ? this.state.city : 'City Not Listed'} Country: {this.state.country && this.state.country ? this.state.country : 'Country Not Listed'}<a href={this.state.url} target="_blank" rel="noopener noreferrer">Tickets</a>
        </>
        )
    }
}
export default Concert

