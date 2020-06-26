import React, { Component } from 'react';

class UserForm extends Component {
  render() {
    return (
      <div className="modal-wrapper">
        <div className="modal-body">
          <div className="form-group">
            <input type="text" placeholder="Name"/>
          </div>
          <div className="form-group">
            <input type="text" placeholder="Phone Number"/>
          </div>
          <button onClick={this.props.hideModal} className="find-btn">Submit</button>
        </div>
      </div>
    )
  }
}

export default UserForm;