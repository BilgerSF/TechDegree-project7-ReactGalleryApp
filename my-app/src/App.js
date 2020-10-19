/*
Gerardo Bilbatuaa
Tech Degree - Project 7
React Gallery App
App component: Parent component that holds the state of images that render in the screen.
*/
import React from 'react';
import ImageContainer from './Components/ImageDisplayer';
import apiKey from './config';
import Navigation from './Components/Navigation';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import Search from './Components/Search';
import NotFound from './Components/NotFound';
import NoImages from './Components/NoImages';
const fetch = require('node-fetch');


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      images:[],
      loading: true, 
      submition: false
    };
    this.stateHandler = this.stateHandler.bind(this);
    this.fetcher = this.fetcher.bind(this);
  }

//Fetches images from 3 different topics when the app first loads.
componentDidMount(){
  this.fetcher('New York,Times Square,Central Park,New York night'); 
    setTimeout(()=>{this.fetcher('San Francisco,San Francisco Bridge,San Francisco Salesforce');},400);
    setTimeout(()=>{this.fetcher('Paris,Eiffel Tower');},800); 
}
//Passed as a callback to search component. This callback modifies state of main component when fetching from the search component.
 stateHandler(searchKey){
  let stateClone;
  this.setState({submition:true,loading:true}); //set the LOADING spinner to true when a search keyword is submitted
//Fetches new images. 72 + 24
  if(this.state.images.length === 72){
    //Add state
    this.fetcher(searchKey);
  }
//if doing a second search. Removes the last 24 fetched images and then it adds the new 24 images to the state
  else{
    //remove and then fetch
    stateClone = Array.from(this.state.images);
    stateClone.splice(72,24);
    this.setState({ images: stateClone});
    this.fetcher(searchKey);
  }
  
}

//This method uses the fetch API and then it parses the JSON response.
fetcher(tag){
  
  fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&sort=relevance&content_type=1&format=json&nojsoncallback=1`)
  .then( (response) =>{
    const jsonResponse = response.json()
    return jsonResponse
  })
  .then((data)=> {
    const photos = data.photos.photo;
    this.jsonParser(photos);
    this.setState({loading:false});//Set the loading spinner to false     
   }).catch(error=>{
  console.error('Error Fetching data from flickr API',error)
   })
}

//This method parses the JSON response into variables containing the image IDs
 jsonParser(photos){
    let farmIds = [];
    let serverIds = [];
    let ids = [];
    let secretIds = [];

    photos.forEach(element => {
    farmIds.push(element.farm);
    serverIds.push(element.server);
    ids.push(element.id);
    secretIds.push(element.secret);
});
    this.imageLinkBuilder(farmIds,serverIds,ids,secretIds);
 }
//This method build the links needed for displaying the images on the browser
//Adds the links the the state 
 imageLinkBuilder(farmIds,serverIds,ids,secretIds){
    let link;
    let i;
    for(i=0;i<=(farmIds.length)-1;i++){
         link = `http://farm${farmIds[i]}.staticflickr.com/${serverIds[i]}/${ids[i]}_${secretIds[i]}.jpg`
         this.setState({
          images:[...this.state.images, link]
        });
      }
   }

  render(){
  return (
   <BrowserRouter> 

    <div className="App">
      <Navigation />
      <Search callBack = {this.stateHandler}/>
    </div>

      <Switch>
        <Route exact path="/" render={() => <Redirect to="/New York" />} />
        <Route exact path = '/New York' render={()=><ImageContainer links={this.state.images} loading={this.state.loading} submition={this.state.submition} route = 'New York'  />}/>
        <Route exact path = '/San Francisco' render={()=><ImageContainer links={this.state.images} loading={this.state.loading}  submition={this.state.submition} route = 'San Francisco'  />}/>
        <Route exact path = '/Paris' render={()=><ImageContainer links={this.state.images} loading={this.state.loading} submition={this.state.submition}  route = 'Paris'/>}  />
        <Route exact path = '/Search/:keys' render={()=><ImageContainer links={this.state.images} loading={this.state.loading} submition={this.state.submition} route = 'Search'  />}/>
        <Route  exact path = '/Search/' component = {NoImages} />
        <Route component = {NotFound} />
     </Switch> 

    </BrowserRouter>  
   );
  }
}

export default App;
