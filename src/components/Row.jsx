import React, { Component } from 'react'
import Tile from './Tile'

export default class Row extends Component {
  render() {

    const width = 20
    const tiles = []
    for (var x = 0; x < width; x++) {
      let letterInTail = null
      let letterOnBoard = null
      for (const player of this.props.players) {
        for (let i = 0; i < player.lettersCollected.length; i++) {
          if (player.snake.history[i + 1].x === x &&
              player.snake.history[i + 1].y === this.props.y) {
            letterInTail = player.lettersCollected[i]
            break
          }
        }

        if (player.currentWord)
          for (const letter of player.currentWord.letters) {
            if (letter.position.x === x && letter.position.y === this.props.y && !letter.eaten)
              letterOnBoard = letter.letter
          }
      }


      tiles.push(<Tile
                    x={x}
                    y={this.props.y}
                    key={x}
                    snakes={this.props.players.map(player => {
                      return {position: player.snake.history[0], facing: player.snake.facing}
                    })}
                    letterOnBoard={letterOnBoard}
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
