import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
  render() {
    return (
      <div className="Profile">
        <div className="profileimgwrapper">
          <img src={this.props.currentCat["image"]} alt="current cat" className="profileimg" />
        </div>
        <p>{this.props.currentCat["name"]}</p>
      </div>
    );
  }
}

export default Profile;
