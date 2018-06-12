import React from 'react';
import $ from 'jquery';
import Listing from './Listing.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      slide: 0,
      visibilityLeft: 'hidden',
      visibilityRight: 'visible',
      lists: [{ id: 1, name: '' }],
      lists2listings: [{ listId: 0, listingId: 0 }],
    };
    this.slideLeft = this.slideLeft.bind(this);
    this.slideRight = this.slideRight.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
  }

  componentDidMount() {
    this.getListings();
    this.checkCarousel();
    this.getLists();
  }

  getListings() {
    axios.get('/listing').then((res) => {
      this.setState({
        data: res.data,
      }, this.getLists2Listings);
    });
  }

  getLists() {
    axios.get('/lists').then((res) => {
      this.setState({
        lists: res.data,
      });
    });
  }

  getLists2Listings() {
    const listingIds = this.state.data.map(listing => listing.id);
    axios.get('/lists2listings', { params: { listingIds } })
      .then((res) => {
        this.setState({
          lists2listings: res.data,
        });
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
    this.state.slide < 1 ? this.toggleShow('Left', 'hidden') : this.toggleShow('Left', 'visible');
    this.state.slide < 9 ? this.toggleShow('Right', 'visible') : this.toggleShow('Right', 'hidden');
  }

  toggleShow(dir, visibility) {
    this.setState({
      [`visibility${dir}`]: visibility,
    });
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
        <button type="img" src="leftArrow.png" id="left" onClick={this.slideLeft} className={this.state.visibilityLeft} />
        <div id="container">
          <h1> Similar listings </h1>
          <div id="slides">
            {this.state.data.map(listing => (<Listing
              listing={listing}
              toggleLike={this.toggleLike}
              lists={this.state.lists}
              lists2listings={this.state.lists2listings}
            />))}
          </div>
        </div>
        <button id="right" onClick={this.slideRight} className={this.state.visibilityRight} />
      </div>
    );
  }
}

export default App;
