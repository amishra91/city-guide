import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Attractions from './components/attractions';
import Restaurants from './components/restaurants';
import Hotels from './components/hotels';
import Airports from './components/airports';
import AttractionDetails from './components/details/attractionDetails';
import HotelDetails from './components/details/hotelDetails';

import './App.css';
import axios from 'axios';
import RestaurantDetails from './components/details/restaurantDetails';

class App extends Component {

  state = {
    restaurants: [],
    attractions: [],
    hotels: [],
    airports: [],
    userInput: null,
    locationId: null,
    showLoader: false,
    locationName: null
  }

  getUserInput = (event) => {
    this.setState({
      userInput: event.target.value
    });
  }

  submiutUserInput = () => {
    const userInput = this.state.userInput;
    this.setState({
      showLoader: true
    });
    axios({
      method: 'GET',
      url: 'https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=' + userInput,
      headers: {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
		    "x-rapidapi-key": "f7d5a62125mshba2044c5f2bb8a3p1739b3jsne2be466bf87a"
      }
    }).then(response => {
      console.log('resp=', response);
        this.setState({
          locationId: response.data.data[0].result_object.location_id,
          showLoader: true,
          locationName: response.data.data[0].result_object.name
        });
      axios({
        method: 'GET',
        url: 'https://tripadvisor1.p.rapidapi.com/restaurants/list?restaurant_tagcategory_standalone=10591&lunit=km&restaurant_tagcategory=10591&limit=30&currency=USD&lang=en_US&location_id='+this.state.locationId,
        headers: {
          "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
          "x-rapidapi-key": "f7d5a62125mshba2044c5f2bb8a3p1739b3jsne2be466bf87a"
        }
      }).then(data => {
        this.setState({
          restaurants: data.data.data
        });
      });
      axios({
        method: 'GET',
        url: 'https://tripadvisor1.p.rapidapi.com/attractions/list?lang=en_US&currency=USD&sort=recommended&lunit=km&location_id='+this.state.locationId,
        headers: {
          "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
          "x-rapidapi-key": "f7d5a62125mshba2044c5f2bb8a3p1739b3jsne2be466bf87a"
        }
      }).then(response => {
        this.setState({
          attractions: response.data.data
        });
      });
      axios({
        method: 'GET',
        url: 'https://tripadvisor1.p.rapidapi.com/hotels/list?offset=0&order=asc&lang=en_US&sort=recommended&adults=1&checkin=%3Crequired%3E&rooms=1&nights=2&location_id='+this.state.locationId,
        headers: {
          "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
          "x-rapidapi-key": "f7d5a62125mshba2044c5f2bb8a3p1739b3jsne2be466bf87a"
        }
      }).then(response => {
        this.setState({
          hotels: response.data.data
        });
      });
      axios({
        method: 'GET',
        url: 'https://tripadvisor1.p.rapidapi.com/airports/search?locale=en_US&query='+this.state.userInput,
        headers: {
          "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
          "x-rapidapi-key": "f7d5a62125mshba2044c5f2bb8a3p1739b3jsne2be466bf87a"
        }
      }).then(response => {
        this.setState({
          airports: response.data,
          showLoader: false
        });
      });
    });
  }



  render() {
    let airports = null;
    let attractions = null;
    let restaurants = null;
    let hotels = null;
    let showLoader = null

    if(this.state.showLoader) {
      showLoader = <img className="loader" src="https://i.pinimg.com/originals/61/00/ab/6100abd8629af73f7e354794ccb28264.gif" />;
    }
    
    if(this.state.airports.length) {
      airports = <Airports airports={this.state.airports} location={this.state.locationName}/>
    }
    if(this.state.attractions.length) {
      attractions = <Attractions attractions={this.state.attractions} location={this.state.locationName}/>
    }
    if(this.state.restaurants.length) {
      restaurants = <Restaurants restaurants={this.state.restaurants} location={this.state.locationName}/>
    }
    if(this.state.hotels.length) {
      hotels = <Hotels hotels={this.state.hotels} location={this.state.locationName}/>
    }


    return (

      
      
        <div className="main-container">
          
          <Router>
            <Route path="/attractions/:id" exact component={AttractionDetails} />
          </Router>
          <Router>
            <Route path="/hotels/:id" exact component={HotelDetails} />
          </Router>
          <Router>
            <Route path="/restaurants/:id" exact component={RestaurantDetails} />
          </Router>

          <Router>
            <Route path="/" exact>
              <div className="input-wrapper">
                <div className="logo-wrapper">
                  <img src="https://itilite.com/View/assets/images/home/images/itilite-logo-1.png" />
                </div>
                <div className="form-group">
                  <input type="text" onChange={this.getUserInput} placeholder="Which city do you want to go to?"/>
                </div>
                <button onClick={this.submiutUserInput} className="find-btn">Submit</button>
              </div>
              
              {airports}
              {attractions}
              {restaurants}
              {hotels}
              {showLoader}
            </Route>
          </Router>
        </div>
    );
  }
}

export default App;
