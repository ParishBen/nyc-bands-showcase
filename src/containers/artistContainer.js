import '../stylesheet/basis.css';
import React from 'react';
import { Route } from 'react-router-dom';
import ArtistList from './ArtistList';
import Artist from '../components/Artist'
import {connect} from 'react-redux'
 
const emptyDiv = () => {
        return document.getElementById('thisDiv') ? document.getElementById('thisDiv').innerHTML = '' : '';   // Originally Displaying welcome message on App.js & don't want to persist that info for other Components.
}

const ArtistContainer = ({match, artists, token}) =>  {
        
        return (
               <>
                        {emptyDiv()}
                         {window.location.href == `http://localhost:3000${match.url}` ? 
                        <ArtistList artists={artists} token={token} /> :
                        <Route path={`${match.url}/:artistId`} render={routerProps => <Artist {...routerProps} artists={artists} token={token}  /> }/>}    {/*Defining Route for each unique Artist*/}
                         </>                 
                 )              
              }

const mapStateToProps = state => {
        return {
          token: state.token              //Getting Redux store value of Token.
        }
      }
export default connect(mapStateToProps)(ArtistContainer)
