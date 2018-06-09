import React from 'react';
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

  render() {
    return (
      <div id="wrapper">
        <img src="leftArrow.png" alt="" id="left" onClick={this.slideLeft.bind(this)} />
        <div id="container">
          <h1> Similar listings </h1>
          <div id="slides">
            {this.state.data.map(listing => <Listing listing={listing} />)}
          </div>
        </div>
        <img src="rightArrow.png" alt="" id="right" onClick={this.slideRight.bind(this)}/>
      </div>
    );
  }
}

const Listing = props => (
  <div className="listing">
    <img src={props.listing.picture} alt="" width="334" height="222" />
    <div className="type"> {props.listing.houseType.toUpperCase()} · {props.listing.beds} BEDS</div>
    <div className="title"> {props.listing.title} </div>
    <div className="cost"> ${props.listing.cost} per night</div>
    <div className="rating"> {props.listing.stars} stars · {props.listing.rating} reviews </div>
  </div>
);

export default App;
