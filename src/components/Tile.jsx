import React, { Component } from 'react'

export default class Tile extends Component {
  render() {
    return (
      <div className="tile">
          <img src={require("../images/woodTile.jpg")}/>
      </div>
    );
  }
}
