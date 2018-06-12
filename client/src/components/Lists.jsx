import React from 'react';
import $ from 'jquery';
import List from './List.jsx'

const Lists = props => (
  <div id="whiteOut">
    <div className="listBox">
      <div className="X" onClick={props.toggleLists}> X </div>
      <div className="list"> 
        <h1> Save to List </h1>
        <h2> Create new list </h2>
        <div> {props.lists.map(list => <List list={list} id={props.listing.id} lists2listings={props.lists2listings} />)} </div>
        <div id="mini">
          <img src={props.listing.picture} alt="" width="167" height="111" />
          <div id="miniContainer">
            <div className="title miniText"> {props.listing.title} </div>
            <div className="cost miniText"> ${props.listing.cost} per night</div>
            <div className="rating miniText"> {props.listing.stars} stars · {props.listing.rating} reviews </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Lists;
