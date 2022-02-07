import React from 'react';
import Alert from '../../node_modules/bootstrap/js/dist/alert';

var alertTrigger = document.getElementById('liveAlertBtn')

function alert(message, type) {
    let alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  var wrapper = document.createElement('div')
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  alertPlaceholder.append(wrapper)
}

function execute() {
  
    alert('Nice, you triggered this alert message!', 'info')
  
}

  const  Salert = () => {
        return(
            <>
           <div class="alert alert-primary" role="alert">
            A simple primary alert—check it out!
            </div>
            <div id="liveAlertPlaceholder"></div>
            <button type="button" class="btn btn-danger" id="liveAlertBtn" onClick={()=> execute()}>Show live alert</button>
            </>
        )
    }

    export default Salert

