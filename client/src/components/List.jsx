import React from 'react';
import axios from 'axios';
import $ from 'jquery';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      lists2listings: [],
    };
    this.likeList = this.likeList.bind(this);
  }

  componentDidMount() {
    this.getLists2Listings();
  }

  getLists2Listings() {
    const listingIds = this.props.listings.map(listing => listing.id);
    axios.get('/lists2listings', { params: { listingIds } })
      .then((res) => {
        this.setState({
          lists2listings: res.data,
        }, this.checkLiked);
      });
  }

  likeList() {
    axios.post('/lists', { listId: this.props.list.id, listingId: this.props.id, liked: this.state.liked })
      .then(() => {
        this.setState({
          liked: !this.state.liked,
        }, this.getLists2Listings);
      });
  }

  checkLiked() {
    const pairs = this.state.lists2listings.map(obj => JSON.stringify([obj.listId, obj.listingId]));
    this.setState({
      liked: pairs.includes(JSON.stringify([this.props.list.id, this.props.id])),
    });
  }

  render() {
    return (
      <div>
        <div className="BB" />
        <div className="listItem"> {this.props.list.name} </div>
        {!this.state.liked && <button className="miniHeartsEmpty" onClick={this.likeList} />}
        {this.state.liked && <button className="miniHeartsFull" onClick={this.likeList} />}
      </div>
    );
  }
}

export default List;
