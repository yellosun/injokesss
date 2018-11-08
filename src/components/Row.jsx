import React, { Component } from 'react'
import Tile from './Tile'

export default class Game extends Component {
  render() {

    const width = 20
    const tiles = []
    for (var x = 0; x < width; x++) {
      tiles.push(<Tile x={x} key={x}></Tile>)
    }
    return (
      <div className="row">
          {tiles}
      </div>
    )
  }
}
