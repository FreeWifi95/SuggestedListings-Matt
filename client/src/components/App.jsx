import React from 'react';
import axios from 'axios';
import Listing from './Listing.jsx';
import styles from './styles.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      marginLeft: 0,
      slide: 0,
      visibilityLeft: styles.hidden,
      visibilityRight: styles.visible,
      lists: [{ id: 1, name: '' }],
    };
    this.slideLeft = this.slideLeft.bind(this);
    this.slideRight = this.slideRight.bind(this);
  }

  componentDidMount() {
    this.getListings();
    this.checkCarousel();
    this.getLists();
  }

  getListings() {
    axios.get('/listing').then((res) => {
      this.setState({
        listings: res.data,
      });
    });
  }

  getLists() {
    axios.get('/lists').then((res) => {
      this.setState({
        lists: res.data,
      });
    });
  }

  slideRight() {
    this.setState({
      slide: this.state.slide + 1,
      marginLeft: this.state.marginLeft - 350,
    }, this.checkCarousel);
  }

  slideLeft() {
    this.setState({
      slide: this.state.slide - 1,
      marginLeft: this.state.marginLeft + 350,
    }, this.checkCarousel);
  }

  checkCarousel() {
    this.state.slide < 1 ? this.toggleShow('Left', styles.hidden) : this.toggleShow('Left', styles.visibile);
    this.state.slide < 9 ? this.toggleShow('Right', styles.visible) : this.toggleShow('Right', styles.hidden);
  }

  toggleShow(dir, visibility) {
    this.setState({
      [`visibility${dir}`]: visibility,
    });
  }

  render() {
    return (
      <div id={styles.wrapper}>
        <button id={styles.left} onClick={this.slideLeft} className={this.state.visibilityLeft}>
          <img src="https://s3-us-west-1.amazonaws.com/bnbresources/leftArrow.png" alt="" className={this.state.visibilityLeft} />
        </button>
        <div id={styles.container}>
          <h1> Similar listings </h1>
          <div id={styles.slides} style={{ transition: 'margin-left .5s', marginLeft: this.state.marginLeft }}>
            {this.state.listings.map(listing => (<Listing
              listing={listing}
              listings={this.state.listings}
              lists={this.state.lists}
              lists2listings={this.state.lists2listings}
            />))}
          </div>
        </div>
        <button id={styles.right} onClick={this.slideRight} className={this.state.visibilityRight}>
          <img src="https://s3-us-west-1.amazonaws.com/bnbresources/rightArrow.png" alt="" className={this.state.visibilityRight} />
        </button>
      </div>
    );
  }
}

export default App;
