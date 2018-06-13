import React from 'react';
import $ from 'jquery';
import List from './List.jsx'
import styles from './styles.css';

const Lists = props => (
  <div id={styles.whiteOut}>
    <div className={styles.listBox}>
      <div className={styles.X} onClick={props.toggleLists}> X </div>
      <div className={styles.list}>
        <h1> Save to List </h1>
        <h2> Create new list </h2>
        <div> {props.lists.map(list => <List list={list} listings={props.listings} listingId={props.listing.id} lists2listings={props.lists2listings} />)} </div>
        <div id={styles.mini}>
          <img src={props.listing.picture} alt="" width="167" height="111" />
          <div id={styles.miniContainer}>
            <div className="title miniText"> {props.listing.title} </div>
            <div className="cost miniText"> {props.listing.cost} per night</div>
            <div className="rating miniText"> {props.listing.stars} stars · {props.listing.rating} reviews </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Lists.propTypes = {
//   listing: React.PropTypes.object.isRequired,
//   lists: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
//   lists2listings: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
// };

export default Lists;
