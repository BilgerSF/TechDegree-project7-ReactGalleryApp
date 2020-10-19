/*
Image component: Receives an array of links and creates and image with that link
*/
import React from 'react'

function Image(props){
   let images = props.links.map((link,i) =>{
     return <li key={i} ><img src={link} alt = 'Img removed' /></li>
});

return(
    images
 );
}
export default Image;
