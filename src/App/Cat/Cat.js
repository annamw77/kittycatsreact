import React from 'react';
import './Cat.css';
import Profile from './Profile/Profile'
import Options from './Options/Options'
import Details from './Details/Details'
import $ from 'jquery';

var Cat = React.createClass ({
  getInitialState: function() {
    return {
      currentCat: 0,
      searchResults: "not loaded",
      showDetails: false
    };
  },

  componentDidMount(){
   this.getCats();
  },

  getCats: function(){
    $.ajax({
      type: "GET",
      url: "http://localhost:1337/cats",
      success: function(response){
        this.updateState(response);
      }.bind(this)
    });
  },

  updateState: function(response){
    this.setState({
        searchResults: response
    })
  },

  handleNextCat: function() {
    var lastcatindex = this.state.searchResults.length-1
    console.log(lastcatindex)
    console.log(this.state.currentCat)
    if (this.state.currentCat < lastcatindex) {
      var nextCat = this.state.currentCat + 1
      this.setState({currentCat: nextCat});
    }
  },

  handlePreviousCat: function() {
    var firstcatindex = 0
    if (this.state.currentCat > firstcatindex) {
      var previousCat = this.state.currentCat - 1
      this.setState({currentCat: previousCat});
    }
  },

  handleDetails: function () {
    if (this.state.showDetails === false) {
      this.setState({showDetails: true})
    } else {
      this.setState({showDetails: false})
    }
  },

  render() {

    var current_display

    if (this.state.searchResults === "not loaded") {
        return <div className="loading">
          <p>Finding Cats...</p>
        </div>
    }

      if (!this.state.showDetails) {
        current_display = <Profile currentCat={this.state.searchResults[this.state.currentCat]}/>
      } else {
        current_display = <Details currentCat={this.state.searchResults[this.state.currentCat]} onDetailsClick={this.handleDetails}/>
      }

    return <div className="cat">
      {current_display}
      <Options onPreviousClick={this.handlePreviousCat} onNextClick={this.handleNextCat} onDetailsClick={this.handleDetails} buttonText="Profile View" />
    </div>

  }
})
export default Cat;
