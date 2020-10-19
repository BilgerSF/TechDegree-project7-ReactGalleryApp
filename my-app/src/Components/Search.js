/*
Search Component: 
*Updates its own state when a key is typed
*Sends the typed word/phrase to the fetcher method on app.js
*/
import React from 'react';
import { withRouter } from 'react-router';


class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            keys: []
        }
    this.keyHandler = this.keyHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    }
//Change state when a key is typed
 keyHandler(e){
    this.setState({keys:e.target.value});
 }
//Change route and call the fetcher callback
 submitHandler(e){
    e.preventDefault();
    //change route 
    this.props.history.push(`/Search/${this.state.keys}`)
    //Callback
    this.props.callBack(this.state.keys);
 }

render(){
    return(
        <form onSubmit = {this.submitHandler} className = 'search-form'>
            <input type = 'text' value={this.state.keys} onChange = {this.keyHandler}/>
            <button type = 'submitt'><svg id="Capa_1" enableBackground="new 0 0 512 512" height="28" viewBox="0 0 512 512" width="28" xmlns="http://www.w3.org/2000/svg"><g><path d="m175.614 282.421h90v25h-90z" fill="#83a3ab" transform="matrix(.707 -.707 .707 .707 -143.924 242.378)"/><path d="m168.543 280.35h90v15h-90z" fill="#93b7c0" transform="matrix(.707 -.707 .707 .707 -140.996 235.307)"/><path d="m66.192 403.381-53.033 95.46c17.545 17.545 46.094 17.546 63.64 0l21.213-21.213z" fill="#93b7c0"/><path d="m34.373 413.988-21.213 21.213c-17.546 17.546-17.545 46.094 0 63.64l74.246-74.246z" fill="#acd5df"/><path d="m98.012 477.627 142.048-142.047-31.82-31.82-92.237 49.811-49.811 92.237z" fill="#3a6fd8"/><path d="m20.863 336.374h200.885v45h-200.885z" fill="#3b88f5" transform="matrix(.707 -.707 .707 .707 -218.232 190.888)"/><path d="m463.526 48.474-175.539 58.513-58.513 175.539c64.632 64.632 169.421 64.632 234.052 0s64.632-169.42 0-234.052z" fill="#93b7c0"/><path d="m229.474 48.474c-64.632 64.632-64.632 169.421 0 234.052l234.052-234.052c-64.632-64.632-169.42-64.632-234.052 0z" fill="#acd5df"/><path d="m421.1 90.9-111.9 37.3-37.3 111.9c41.2 41.2 107.999 41.2 149.2 0s41.2-107.999 0-149.2z" fill="#c4f3ff"/><path d="m271.9 90.9c-41.2 41.2-41.2 107.999 0 149.2l149.2-149.2c-41.201-41.2-107.999-41.2-149.2 0z" fill="#fff"/></g></svg></button>
        </form>
      )
   }
}

export default withRouter(Search);
