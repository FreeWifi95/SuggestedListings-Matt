import React from 'react';
import $ from 'jquery';
import Lists from './Lists.jsx';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: true,
      lists: false,
      margin: '-35px',
    };
  }

  componentWillMount() {
    this.isLiked(this.props.listing.id);
  }

  isLiked() {
    $.ajax({
      method: 'GET',
      url: '/like',
      data: { data: this.props.listing.id },
      success: (res) => {
        const liked = !!JSON.parse(res);
        this.setState({
          liked: liked,
        });
      },
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
        <div className="imageContainer" onMouseEnter={this.slideDown.bind(this)} onMouseLeave={this.slideUp.bind(this)}>
          <div className="showLists" onClick={this.toggleLists.bind(this)} style={{marginTop: this.state.margin, transition: 'all .5s ease-out'}}> Add to lists </div>
          <img src={this.props.listing.picture} alt="" width="334" height="222" />
        </div>
        <div className="type"> {this.props.listing.houseType.toUpperCase()} · {this.props.listing.beds} BEDS</div>
        <div className="title"> {this.props.listing.title} </div>
        <div className="cost"> ${this.props.listing.cost} per night</div>
        <div className="rating"> {this.props.listing.stars} stars · {this.props.listing.rating} reviews </div>
        {this.state.lists && <Lists 
          lists={this.props.lists}
          listing={this.props.listing}
          toggleLists={this.toggleLists.bind(this)} 
          lists2listings={this.props.lists2listings}
        />}
        {this.state.liked && <img
          src="heartFull.png" 
          alt="" 
          className="heart" 
          width="30"
          height="30" 
          onClick={() => {
            this.props.toggleLike(this.props.listing.id); 
            this.isLiked();
          }}
        />}
        {!this.state.liked && <img
          src="heartOutline.png"
          alt=""
          className="heart"
          width="30"
          height="30"
          onClick={() => {
            this.props.toggleLike(this.props.listing.id); 
            this.isLiked();
          }}
        />}
      </div>
    );
  }
}

export default Listing;
