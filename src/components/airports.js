import React, { Fragment } from 'react';


const Airports = (props) => {
  console.log('port=', props);
  let imgSrc = null;
  return (
    <Fragment>
      <h2 className="section-heading">Airports in <span>{props.location}</span></h2>
      <ul className="display-card-wrapper">
        {
          props.airports.map((airport, index) => {
            if(airport.photo) {
              imgSrc = airport.photo.images.original.url;
            } else {
              imgSrc = 'https://naco.nl/wp-content/uploads/2019/11/Is-your-Airport-Ready-for-the-GRF_Hero.jpg';
            }
            return ( 
            <li key={index} className="display-card">
              <div className="display-card-img-holder">
                <img src={imgSrc} />
              </div>
              <p>{airport.name}</p>
            </li>
            )
          })
        }
      </ul>
    </Fragment>
  )
}


export default Airports;