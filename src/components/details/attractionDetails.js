import React, { Component, Fragment } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import UserForm from '../userForm';

class AttractionDetails extends Component {
  state = {
    details : [],
    showLoader: true,
    showModal: false
  }

  componentWillMount() {
    axios({
      method: 'GET',
      url: 'https://tripadvisor1.p.rapidapi.com/attractions/get-details?currency=USD&lang=en_US&location_id='+this.props.match.params.id,
      headers: {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": "f7d5a62125mshba2044c5f2bb8a3p1739b3jsne2be466bf87a"
      }
    }).then(response => {
      this.setState({
        details: response.data,
        showLoader: false
      });
    });
  }

  showModal = () => {
    this.setState({
      showModal: true
    });
  }

  hideModal = () => {
    this.setState({
      showModal: false
    });
  }

  render() {
    console.log(this.state.details);
    let attractionRating = null;
    let imgSrc = null;
    let showLoader = null;
    let reviews = null;
    let displayModal = null;

    if(this.state.showModal) {
      displayModal = <UserForm hideModal={this.hideModal} />
    }

    if(this.state.details.reviews) {
      reviews = this.state.details.reviews.map((review, index) => {
        return (
          <li className="user-review" key={index}>{review.summary}</li>
        )
      });
    } else {
      reviews = <p>No user reviews</p>;
    }

    if(this.state.showLoader) {
      showLoader = <img className="loader" src="https://i.pinimg.com/originals/61/00/ab/6100abd8629af73f7e354794ccb28264.gif" />;
    }

    if(this.state.details.photo) {
      imgSrc = this.state.details.photo.images.original.url;
    } else {
      imgSrc = 'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png';
    }

    if(this.state.details.rating) {
      attractionRating = this.state.details.rating;
    } else {
      attractionRating = 0;
    }
    
    return (
      
      
      <Fragment>
        {displayModal}
        
        {showLoader}
        <div className="details-container">
          <div className="details-main-img-container">
            <img className="detail-img" src={imgSrc} />
          </div>
          <div className="details-main-data-container">
            <h1>{this.state.details.name}</h1>
            <p className="address-phone">{this.state.details.description}</p>
              <StarRatings 
                rating={parseInt(attractionRating)}
                starRatedColor="orange" 
                numberOfStars={5} 
                name='rating'
                starDimension="14px"
                starSpacing="1px"
              />
            <span className="rating-count total-count">{this.state.details.num_reviews} ratings</span>
            <p className="address-phone"><span>Address:</span> {this.state.details.address}</p>
            <p className="address-phone"><span>Phone:</span> {this.state.details.phone}</p>
            <p className="address-phone"><span>Email:</span> {this.state.details.email}</p>  
            <button className="enquiry-btn" onClick={this.showModal}>Send Enquiry</button>
          </div>
        </div>

        <div className="review-section">
          <h3 className="reviews-heading">Reviews</h3>
          <ol className="review-container">
            {reviews}
          </ol>
        </div>
      </Fragment>
    )
  }
}

export default AttractionDetails;