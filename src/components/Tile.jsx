import React, { Component } from 'react'

export default class Tile extends Component {
  render() {
    if (this.props.snake)
      console.log("snake!")
    return (
      <div className="tile">
          
          {this.props.snake ? "Snake!" : <img src={require("../images/woodTile.jpg")} alt="some thing"/>}
      </div>
    );
  }
}
