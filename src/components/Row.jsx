import React, { Component } from 'react'
import Tile from './Tile'

export default class Row extends Component {
  render() {

    const width = 20
    const tiles = []
    for (var x = 0; x < width; x++) {
      tiles.push(<Tile x={x} key={x} snake={this.props.snakePos.x === x && this.props.snakePos.y === this.props.y}></Tile>)
    }
    return (
      <div className="row">
          {tiles}
      </div>
    )
  }
}
