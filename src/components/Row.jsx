import React, { Component } from 'react'
import Tile from './Tile'

export default class Row extends Component {
  render() {

    const width = 20
    const tiles = []
    for (var x = 0; x < width; x++) {
      let letterInTail = null
      for (let i = 0; i < this.props.lettersCollected.length; i++) {
        if (this.props.snakeHistory[i + 1].x === x &&
            this.props.snakeHistory[i + 1].y === this.props.y) {
          letterInTail = this.props.lettersCollected[i]
          break
        }
      }

      const snakePos = this.props.snakeHistory[0]
      tiles.push(<Tile
                    x={x}
                    y={this.props.y}
                    key={x}
                    snake={snakePos.x === x && snakePos.y === this.props.y}
                    snakeFacing={this.props.snakeFacing}
                    currentWord={this.props.currentWord}
                    letterInTail={letterInTail}
                  />)
    }
    return (
      <div className="row">
          {tiles}
      </div>
    )
  }
}
