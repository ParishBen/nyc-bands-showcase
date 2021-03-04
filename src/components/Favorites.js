import React from 'react'

export default class Favorites extends React.Component {

     //delBtn = <button id="delBtn" onClick={(event) => this.deleteArtist(event)}>Delete</button>

componentDidUpdate(){
    this.faveFetcher()
    //window.location.reload
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
        res.map(fave=> {
    let li = document.createElement('li')
            li.innerHTML = fave.name
            let delBtn = document.createElement('button')
            delBtn.innerHTML = "Delete"
            delBtn.addEventListener('click', this.deleteArtist)
            li.appendChild(delBtn)
            if(!document.getElementById('faveList').textContent.includes(fave.name))
            document.getElementById('faveList').append(li)
        })
    })
    .catch(err=> console.log(err))
    }

    deleteArtist=(event)=>{
        console.log(event.target.parentElement.textContent)
        let delArtist = event.target.parentElement.textContent
       let artist = delArtist.substring(0,delArtist.indexOf('Delete'))
       fetch(`http://localhost:9000/artists/${artist}`, {
           method: "DELETE",
           headers: {
               Accept: 'application/json',
               'Content-type': 'application/json'
           }
       }).then(function(){
           //document.getElementById('head').textContent 
           window.location = "http://localhost:3000/favorites"
          console.log('deleted success')})
           .catch(err=> console.log(err))
    }

    render(){
        return(
            <div>
            <h1 id="head">NYC FAVES</h1>
            {this.faveFetcher()}
            <ul id='faveList'></ul>
        </div>
        )
    }
}