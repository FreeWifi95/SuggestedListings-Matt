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
      <div id="container">
        <h1> Similar listings </h1>
        <div>
          {this.state.data.map(listing => <Listing listing={listing} />)}
        </div>
      </div>
    );
  }
}

const Listing = props => (
  <div className="listing">
    <img src={props.listing.picture} alt="" width="316" height="210" />
    <div className="type"> {props.listing.houseType} - {props.listing.beds} BEDS</div>
    <div className="title"> {props.listing.title} </div>
    <div className="cost"> ${props.listing.cost} per night</div>
    <div className="rating"> {props.listing.stars} stars * {props.listing.rating} reviews </div>
  </div>
);

export default App;
