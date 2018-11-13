import React, { Component } from 'react'

export default class Tile extends Component {
  render() {
    let image = "woodTile.jpg"

    let letterInTile = null
    if (this.props.letterInTail !== null) {
      letterInTile = this.props.letterInTail
    } else if (this.props.letterOnBoard !== null) {
      letterInTile = this.props.letterOnBoard
    }

    let snakeInTile = null
    for (const snake of this.props.snakes) {
      if (snake.position.x === this.props.x &&
          snake.position.y === this.props.y) {
            snakeInTile = snake
            break
          }
    }

    if (snakeInTile !== null) {
      if (snakeInTile.facing.x === 0 && snakeInTile.facing.y === 1)
        image = "snakeDown.png"
      else if (snakeInTile.facing.x === 0 && snakeInTile.facing.y === -1)
        image = "snakeUp.png"
      else if (snakeInTile.facing.x === 1 && snakeInTile.facing.y === 0)
        image = "snakeRight.png"
      else if (snakeInTile.facing.x === -1 && snakeInTile.facing.y === 0)
        image = "snakeLeft.png"
    }
    return (
        <div>
        {letterInTile !== null
            ? <div className="lettered-tile">{letterInTile}</div>
            : <div className="tile"><img src={require(`../images/${image}`)} alt="some thing"/></div>
        }
        </div>
    );
  }
}
