/*
ImageDisplayer Component: 
*Manages what gets displayed on the browser by adding and removing link elements from the a state clone. 
*Clones the state and then it passes the list of links to Image.js
*Handles the loading feature as well as the no maches feature.
*/
import React from 'react';
import Image from './Image';
import NoImages from './NoImages';

function ImageContainer(props){

  let links = Array.from(props.links);
  let route = props.route;
  let loading = props.loading
  let submition = props.submition;
  let size = props.links.length;
//Display only new york images when 'New York' is clicked 
if(route==='New York'){
  links.splice(72,24);
  links.splice(24,48)
  submition = false;
}
//Display only San Francisco  images when 'San Francisco' is clicked 
else if(route==='San Francisco'){
  links.splice(72,24);
  links.splice(48,24);
  links.splice(0,24)
  submition = false; 
}
//Display only Paris  images when 'Paris' is clicked 
else if(route==='Paris') {
  links.splice(72,24);
  links.splice(0,48);
  submition = false;
}
else{
  links.splice(0,72);
}

//.................................Loading and No maches features.........................................
//Render no images component when nothing was fetched 
if( (loading === false) && (size === 72) && (submition === true) ){
  return <NoImages/>  
}
//Render the image component when everything worked as expected and the coponent is not loading
if(loading === false) {
  return(
    <div className = 'photo-container'> 
     <h2>Results</h2>
        <ul>
          <Image links = {links}/>
        </ul>   
    </div>
      )
  }
//Render the loading component when the fetching process is still in progress
 else if ( loading ===  true ) {
    return(
        <div className = 'photo-container'> 
          <h2 className = 'loader'>Loading...</h2>
        </div>
      )
   }
    
}

export default ImageContainer;
