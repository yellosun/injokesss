import React, { Component } from 'react'

export default class Tile extends Component {
  render() {
    return (
      <div className="tile">
          
          {this.props.snake ? "Snake!" : <img src={require("../images/woodTile.jpg")} alt="some thing"/>}
      </div>
    );
  }
}
