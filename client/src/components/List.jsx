import React from 'react';
import axios from 'axios';
import styles from './styles.css';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists2listings: [],
      liked: false,
    };
    this.likeList = this.likeList.bind(this);
  }

  componentDidMount() {
    this.getLists2Listings();
  }

  getLists2Listings() {
    // if (this.state.lists2listings.listings.length > 0) {
      // this.setState({
      //   liked: !this.state.liked,
      // });
    // }

    const listingIds = this.props.listings.map(listing => listing.id);
    axios.get('/lists2listings/:id', { params: { listingIds } })
      .then((res) => {
        console.log('getl2l promise ran');
        this.setState({
          lists2listings: res.data,
        }, this.checkLiked);
      })
      .catch(() => console.log('err'));
  }

  likeList() {
    console.log('likeList ran');
    axios.post('/lists', { listId: this.props.list.id, listingId: this.props.listingId, liked: this.state.liked })
      .then(() => {
        console.log('likeList promise ran')
        this.getLists2Listings();
      });
    this.setState({
      liked: !this.state.liked,
    });
  }

  checkLiked() {
    const pairs = this.state.lists2listings.map(obj => JSON.stringify([obj.listId, obj.listingId]));
    this.setState({
      liked: pairs.includes(JSON.stringify([this.props.list.id, this.props.listingId])),
    });
  }

  render() {
    return (
      <div>
        <div className={styles.BB} />
        <div className={styles.listItem} id={styles.miniText}> {this.props.list.name} </div>
        {/* {!this.state.liked && <button className={style.miniHeartsEmpty} onClick={this.likeList} />}
        {this.state.liked && <button className={style.miniHeartsFull} onClick={this.likeList} />} */}
        <button onClick={this.likeList} className={styles.miniList}>
          {!this.state.liked && <img src="https://s3-us-west-1.amazonaws.com/bnbresources/heartOutline.png" alt="" className={styles.miniHeartsEmpty} />}
          {this.state.liked && <img src="https://s3-us-west-1.amazonaws.com/bnbresources/heartFull.png" alt="" className={styles.miniHeartsFull} />}
        </button>
      </div>
    );
  }
}

export default List;
