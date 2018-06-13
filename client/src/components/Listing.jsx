import React from 'react';
import axios from 'axios';
import Lists from './Lists.jsx';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: true,
      lists: false,
      margin: '-35px',
    };
    this.slideDown = this.slideDown.bind(this);
    this.slideUp = this.slideUp.bind(this);
    this.toggleLists = this.toggleLists.bind(this);
  }

  componentWillMount() {
    this.isLiked(this.props.listing.id);
  }

  toggleLike(id) {
    axios.post('/like', { data: id }).then(() => this.isLiked());
  }

  isLiked() {
    axios.get('/like', { params: { data: this.props.listing.id } }).then((res) => {
      this.setState({
        liked: !!res.data,
      });
    });
  }

  slideDown() {
    this.setState({
      margin: '5px',
    });
  }

  slideUp() {
    this.setState({
      margin: '-35px',
    });
  }

  toggleLists() {
    this.setState({
      lists: !this.state.lists,
    });
  }

  render() {
    return (
      <div className="listing">
        <div className="imageContainer" onMouseEnter={this.slideDown} onMouseLeave={this.slideUp}>
          <div className="showLists" onClick={this.toggleLists} style={{marginTop: this.state.margin, transition: 'all .5s ease-out'}}> Add to lists </div>
          <img src={this.props.listing.picture} alt="" width="334" height="222" />
        </div>
        <div className="type"> {this.props.listing.houseType.toUpperCase()} · {this.props.listing.beds} BEDS</div>
        <div className="title"> {this.props.listing.title} </div>
        <div className="cost"> ${this.props.listing.cost} per night</div>
        <div className="rating"> {this.props.listing.stars} stars · {this.props.listing.rating} reviews </div>
        {this.state.lists && <Lists
          lists={this.props.lists}
          listing={this.props.listing}
          listings={this.props.listings}
          toggleLists={this.toggleLists} 
          lists2listings={this.props.lists2listings}
        />}
        {this.state.liked && <button
          className="heartFull"
          onClick={() => { this.toggleLike(this.props.listing.id); }}
        />}
        {!this.state.liked && <button
          className="heartEmpty"
          onClick={() => { this.toggleLike(this.props.listing.id); }}
        />}
      </div>
    );
  }
}

// Listing.propTypes = {
//   listing: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
//   lists: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
//   lists2listings: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
// };

export default Listing;
