import '../stylesheet/basis.css';
import React from 'react';
import { Route } from 'react-router-dom';
import ArtistList from './ArtistList';
import Artist from '../components/Artist'
import {connect} from 'react-redux'
 
const emptyDiv = () => {
        return document.getElementById('thisDiv') ? document.getElementById('thisDiv').innerHTML = '' : '';   // Originally Displaying welcome message on App.js & don't want to persist that info for other Components.
      }
const removeImg = () => {
        document.querySelector('body').style.background = ''
      }

const artBackGround = () => {
        let src = document.createElement('img')
         src.id = 'artist-container-img'
          src.url = 'https://cdn.shortpixel.ai/spai2/w_301+q_lossy+ret_img+to_webp/https://www.nycinsiderguide.com/wp-content/uploads/2017/04/barclays-center-brooklyn.jpg'
        document.querySelector('body').style.background = `url("${src.url}") no-repeat fixed center`
       document.querySelector('body').style.backgroundSize = 'cover'
      }

const ArtistContainer = ({match, artists, token}) =>  {
        return(
               <>
                {emptyDiv()}{removeImg()}{artBackGround()}
                 {window.location.href === `http://localhost:3000${match.url}` ?  /* Path matching /artists will display ArtistList component*/
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
