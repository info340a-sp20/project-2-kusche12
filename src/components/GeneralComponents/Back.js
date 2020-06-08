import React, { Component } from 'react';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class Back extends Component {

  render() {
    return (
      <div>
        <FontAwesomeIcon
          icon={faChevronLeft}
          style={{ color: 'orange' }}
          className="mr-2" />
        Back
      </div>
    )
  }
}