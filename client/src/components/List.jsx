import React from 'react';
import $ from 'jquery';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: this.checkLiked(),
    };
  }

  likeList() {
    $.ajax({
      method: 'POST',
      url: '/lists',
      data: {
        listId: this.props.list.id,
        listingId: this.props.id,
        liked: this.checkLiked(),
      },
      success: () => {
        this.setState({
          lists: !this.state.lists,
        });
      },
    });
  }

  checkLiked() {
    const pairs = this.props.lists2listings.map(obj => JSON.stringify([obj.listId, obj.listingId]));
    
    console.log([this.props.list.id, this.props.id]);
    return pairs.includes(JSON.stringify([this.props.list.id, this.props.id]));
  }

  render() {
    return(
      <div>
        <div className="BB"> </div>
        <div className="listItem"> {this.props.list.name} </div>
        {!this.state.lists && <img
          src="heartOutline.png"
          alt=""
          className="miniHearts"
          width="30"
          height="30"
          onClick={this.likeList.bind(this)}
        />}
        {this.state.lists && <img
          src="heartFull.png"
          alt=""
          className="miniHearts"
          width="30"
          height="30"
          onClick={this.likeList.bind(this)}
        />}
      </div>
    );
  }
}

export default List;
