import React from 'react';
import $ from 'jquery';
import List from './List.jsx'

class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thing: '',
    }
  }

  render() {
    return (
      <div id="whiteOut">
        <div className="listBox">
          <div className="X" onClick={this.props.toggleLists}> X </div>
          <div className="list"> 
            <h1> Save to List </h1>
            <h2> Create new list </h2>
            <div> {this.props.lists.map(list => <List list={list} id={this.props.listing.id} lists2listings={this.props.lists2listings} />)} </div>
            <div id="mini">
              <img src={this.props.listing.picture} alt="" width="167" height="111" />
              <div id="miniContainer">
                <div className="title miniText"> {this.props.listing.title} </div>
                <div className="cost miniText"> ${this.props.listing.cost} per night</div>
                <div className="rating miniText"> {this.props.listing.stars} stars · {this.props.listing.rating} reviews </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Lists;
