import React, { Fragment } from 'react';
import StarRatings from 'react-star-ratings';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const Hotels = (props) => {
  let imgSrc = null;
  let hotelRating = null;
  let hotelClass = null;
  return (
    <Fragment>
      <h2 className="section-heading">Hotels in <span>{props.location}</span></h2>
      <ul className="display-card-wrapper">
        {
          props.hotels.map((hotel, index) => {
            if(hotel.photo) {
              imgSrc = hotel.photo.images.original.url;
            } else {
              imgSrc = 'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png';
            }
            if(hotel.rating) {
              hotelRating = parseInt(hotel.rating);
            }

            if(parseInt(hotel.hotel_class).toFixed() <= 2) {
              hotelClass = "Quality unclear"
            } else {
              hotelClass = parseInt(hotel.hotel_class).toFixed() + "-star hotel";
            }

            return ( 
            <li key={hotel.name} className="display-card">
              <Router>
                <Link to={"/hotels/"+hotel.location_id} target="_blank">
                  <div className="display-card-img-holder">
                    <img src={imgSrc} />
                  </div>
                  <p className="hotel-name">{hotel.name}</p>

                  <span className="rating-count">{hotel.rating}</span>
                  <StarRatings 
                    rating={hotelRating}
                    starRatedColor="orange" 
                    numberOfStars={5} 
                    name='rating'
                    starDimension="14px"
                    starSpacing="1px"
                  />
                  <span className="rating-count total-count">({hotel.num_reviews})</span>
                  <p className="hotel-class">{hotelClass}</p>
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


export default Hotels;