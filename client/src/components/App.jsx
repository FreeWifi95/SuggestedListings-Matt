import React from 'react';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getListings();
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

  test() {
    this.setState({
      data: [],
    });
  }

  render() {
    return (
      <div>
        Similar Listings
        {this.state.data.map(listing => <Listing listing={listing} />)}
      </div>
    );
  }
}

const Listing = props => (
  <div>
    <div> {props.listing.title} </div>
    <div> {props.listing.houseType} </div>
    <img src="https://i.imgur.com/LRoLTlK.jpg" alt="" width="200" height="250" />
  </div>

);

export default App;
