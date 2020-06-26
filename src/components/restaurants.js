import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const Restaurants = (props) => {
  let imgSrc = null;
  return (
    <Fragment>
      <h2 className="section-heading">Restaurants in <span>{props.location}</span></h2>
      <ul className="display-card-wrapper">
        {
          props.restaurants.map((restaurant, index) => {
            if(restaurant.photo) {
              imgSrc = restaurant.photo.images.original.url;
            } else {
              imgSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvs5GKPf-nat9pN8KBl5BZ4SEM-F2YKWuQkA&usqp=CAU';
            }
            return ( 
              <Router>
                <li key={index} className="display-card">
                  <Link to={"/restaurants/"+restaurant.location_id} target="_blank">
                    <div className="display-card-img-holder">
                      <img src={imgSrc} />
                    </div>
                    <p>{restaurant.name}</p>
                    <p className="desc">{restaurant.description}</p>
                  </Link>
                </li>
              </Router>
            )
          })
        }
      </ul>
    </Fragment>
  )
}


export default Restaurants;