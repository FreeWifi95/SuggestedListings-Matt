import React from 'react';
import Listing from './Listing.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      slide: 0,
      visibilityLeft: 'hidden',
      visibilityRight: 'visible',
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
      this.setState({
        visibilityLeft: 'hidden',
      });
    } else {
      this.setState({
        visibilityLeft: 'visible',
      });
    }

    if (this.state.slide < 9) {
      this.setState({
        visibilityRight: 'visible',
      });
    } else {
      this.setState({
        visibilityRight: 'hidden',
      });
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
        <img src="leftArrow.png" alt="" id="left" onClick={this.slideLeft.bind(this)} className={this.state.visibilityLeft}/>
        <div id="container">
          <h1> Similar listings </h1>
          <div id="slides">
            {this.state.data.map(listing => (<Listing
              listing={listing}
              toggleLike={this.toggleLike.bind(this)}
            />))}
          </div>
        </div>
        <img src="rightArrow.png" alt="" id="right" onClick={this.slideRight.bind(this)} className={this.state.visibilityRight}/>
      </div>
    );
  }
}

export default App;
