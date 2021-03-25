import '../stylesheet/basis.css';
import React from 'react';
import { Route } from 'react-router-dom';
import ArtistList from './ArtistList';
import Artist from '../components/Artist'
import {connect} from 'react-redux'

const componentDidMount = () => {
      destroyDiv()  
}
const destroyDiv = () => {
        document.getElementById('thisDiv').remove()   // Originally Displaying welcome message on App.js & don't want to persist that info for other Components.
}
const ArtistContainer = ({match, artists, token}) =>  {
        
         

        return (
                
               
                        `${window.location.href}` === 'http://localhost:3000/artists' ?  <div> {document.getElementById('thisDiv') ? document.getElementById('thisDiv').innerHTML = '': ''}
                        <ArtistList artists={artists} token={token} /> 
                          </div> :
                         <div><Route path={`${match.url}/:artistId`} render={routerProps => <Artist {...routerProps} artists={artists} token={token}  /> }/>    {/*Defining Route for each unique Artist*/}
                         </div>                  
                 )             
        
}
const mapStateToProps = state => {
        return {
          token: state.token              //Getting Redux store value of Token.
        }
      }
export default connect(mapStateToProps)(ArtistContainer)
