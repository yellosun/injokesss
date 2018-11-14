import React, { Component } from 'react'
import Row from './Row'


export default class Board extends Component {
  render() {
    const entitiesInTiles = []
    for (const player of this.props.players) {
      for (let i = 0; i < player.lettersCollected.length; i++) {
        entitiesInTiles.push({
          position: {
            x: player.snake.history[i + 1].x,
            y: player.snake.history[i + 1].y
          },
          type: "collectedLetter", letter: player.lettersCollected[i], color: player.color})
      }

      if (player.currentWord) {
        for (const letter of player.currentWord.letters) {
          if (!letter.eaten) {
            entitiesInTiles.push({
              position: {
                x: letter.position.x,
                y: letter.position.y
              },
              type: "letterOnBoard", letter: letter.letter})
          }
        }
      }

      entitiesInTiles.push({
        position: {
          x: player.snake.history[0].x,
          y: player.snake.history[0].y
        },
        type: "snake", facing: player.snake.facing})
    }

    const height = 20
    const rows = []
    for (var y = 0; y < height; y++) {
        // eslint-disable-next-line
      rows.push(<Row y={y} key={y} entities={entitiesInTiles.filter(entity => entity.position.y === y)}/>)
    }
    return (
      <div className="board">
          {rows}
      </div>
    );
  }
}
