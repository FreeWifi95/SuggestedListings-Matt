import React from 'react';

const Heart = props => (
  <div>
    <img
      src="heartFull.png" 
      alt="" 
      className="heart" 
      width="30"
      height="30" 
      onClick={() => {
        this.props.toggleLike(this.props.listing.id); 
        this.isLiked();
      }}
    />
  </div>
);

export default Heart;
