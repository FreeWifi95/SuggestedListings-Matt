import React from 'react';
import Listing from './listing.jsx'
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      slide: 0,
    };
  }

  componentDidMount() {
    this.getListings();
    this.checkCarousel();
  }

  getListings() {
    $.ajax({
      method: 'GET',
      url: '/list',
      success: (res) => {
        this.setState({
          data: JSON.parse(res),
        });
      },
    });
  }

  slideRight() {
    $('#slides').animate({ 'margin-left': '-=350px' }, 300);
    this.setState({
      slide: this.state.slide + 1,
    }, this.checkCarousel);
  }

  slideLeft() {
    $('#slides').animate({ 'margin-left': '+=350px' }, 300);
    this.setState({
      slide: this.state.slide - 1,
    }, this.checkCarousel);
  }

  checkCarousel() {
    console.log(this.state.slide);
    if (this.state.slide < 1) {
      $('#left').css("visibility", "hidden");
    } else {
      $('#left').css("visibility", "visible");
    }

    if (this.state.slide < 9) {
      $('#right').css("visibility", "visible");
    } else {
      $('#right').css("visibility", "hidden");
    }
  }

  toggleLike(id) {
    $.ajax({
      method: 'POST',
      url: '/like',
      data: { data: id },
      success: () => console.log('toggled like'),
      err: () => console.log('there was an error'),
    });
  }

  render() {
    return (
      <div id="wrapper">
        <img src="leftArrow.png" alt="" id="left" onClick={this.slideLeft.bind(this)} />
        <div id="container">
          <h1> Similar listings </h1>
          <div id="slides">
            {this.state.data.map(listing => (<Listing
              listing={listing}
              toggleLike={this.toggleLike.bind(this)}
            />))}
          </div>
        </div>
        <img src="rightArrow.png" alt="" id="right" onClick={this.slideRight.bind(this)}/>
      </div>
    );
  }
}

export default App;
