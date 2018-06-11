import React from 'react';
import $ from 'jquery';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: true,
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

  render() {
    return(
      <div className="listing">  
        <div>
          <img src={this.props.listing.picture} alt="" width="334" height="222" />
        </div>
        <div className="type"> {this.props.listing.houseType.toUpperCase()} · {this.props.listing.beds} BEDS</div>
        <div className="title"> {this.props.listing.title} </div>
        <div className="cost"> ${this.props.listing.cost} per night</div>
        <div className="rating"> {this.props.listing.stars} stars · {this.props.listing.rating} reviews </div>
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
};

export default Listing;
