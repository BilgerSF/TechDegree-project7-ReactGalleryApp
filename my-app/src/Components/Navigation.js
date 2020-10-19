/*
Navigation Component: Directes to the corresponding Route( on App.js) when the link is clicked.
*/
import React from 'react';
import {NavLink} from 'react-router-dom';

function Navigation(){
   return(
        <nav className = 'main-nav'>
        <ul>
           <li><NavLink exact to='/New York'>New York</NavLink></li>
           <li><NavLink exact to='/San Francisco'>San Francisco</NavLink></li>
           <li><NavLink exact to='/Paris'>Paris</NavLink></li>
         </ul>   
       </nav>
    )
}

export default Navigation;