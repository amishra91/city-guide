import React, { Fragment } from 'react';
import StarRatings from 'react-star-ratings';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const Attractions = (props) => {
  let imgSrc = null;

  let attractionRating = null;
  return (
    <Fragment>
      <h2 className="section-heading">Attractions in <span>{props.location}</span></h2>
      <ul className="display-card-wrapper">
        {
          props.attractions.map((attraction, index) => {
            if(attraction.photo) {
              imgSrc = attraction.photo.images.original.url;
            } else {
              imgSrc = 'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png';
            }

            if(attraction.rating) {
              attractionRating = attraction.rating;
            } else {
              attractionRating = 0;
            }
            return ( 
              
                <li key={attraction.location_id + 99} className="display-card">
                  <Router>
                    <Link to={"/attractions/"+attraction.location_id} target="_blank">
                      <div className="display-card-img-holder">
                        <img src={imgSrc} />
                      </div>
                      <p>{attraction.name}</p>

                      <span className="rating-count">{attraction.rating}</span>
                      <StarRatings 
                        rating={parseInt(attractionRating)}
                        starRatedColor="orange" 
                        numberOfStars={5} 
                        name='rating'
                        starDimension="14px"
                        starSpacing="1px"
                      />
                      <span className="rating-count total-count">({attraction.num_reviews})</span>
                    </Link>
                  </Router>
                </li>
            )
          })
        }
      </ul>
    </Fragment>
  )
}


export default Attractions;