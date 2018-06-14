import React from 'react';
import axios from 'axios';
import Lists from './Lists.jsx';
import styles from './styles.css';


class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.isLiked(this.props.listing.id),
      lists: false,
      margin: '-35px',
    };
    this.slideDown = this.slideDown.bind(this);
    this.slideUp = this.slideUp.bind(this);
    this.toggleLists = this.toggleLists.bind(this);
  }

  toggleLike(id) {
    this.setState({
      liked: !this.state.liked,
    });

    axios.post('/like', { data: id });
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
      <div className={styles.listing}>
        <div className={styles.imageContainer} onMouseEnter={this.slideDown} onMouseLeave={this.slideUp}>
          <div className={styles.showLists} onClick={this.toggleLists} style={{marginTop: this.state.margin, transition: 'all .5s ease-out'}}> Add to lists </div>
          <img src={this.props.listing.picture} alt="" width="334" height="222" />
        </div>
        <div className={styles.type}> {this.props.listing.houseType.toUpperCase()} · {this.props.listing.beds} BEDS</div>
        <div className={styles.title}> {this.props.listing.title} </div>
        <div className={styles.cost}> ${this.props.listing.cost} per night</div>
        <div className={styles.rating}> {this.props.listing.stars} stars · {this.props.listing.rating} reviews </div>
        {this.state.lists && <Lists
          lists={this.props.lists}
          listing={this.props.listing}
          listings={this.props.listings}
          toggleLists={this.toggleLists} 
          lists2listings={this.props.lists2listings}
        />}
        {/* {this.state.liked && <button
          className={styles.heartFull}
          onClick={() => { this.toggleLike(this.props.listing.id); }}
        />}
        {!this.state.liked && <button
          className={styles.heartEmpty}
          onClick={() => { this.toggleLike(this.props.listing.id); }}
        />} */}
        <button onClick={() => { this.toggleLike(this.props.listing.id); }} >
          {!this.state.liked && <img src="https://s3-us-west-1.amazonaws.com/bnbresources/heartOutline.png" alt="" className={styles.heartEmpty} />}
          {this.state.liked && <img src="https://s3-us-west-1.amazonaws.com/bnbresources/heartFull.png
" alt="" className={styles.heartFull} />}
        </button>
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
