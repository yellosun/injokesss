import React, { Component } from 'react'

export default class Tile extends Component {
  render() {
    let image = "woodTile.jpg"

    let letterInTile = null
    if (this.props.currentWord !== null) {
      for (const letter of this.props.currentWord.letters) {
        if (letter.position.x === this.props.x && letter.position.y === this.props.y && !letter.eaten) {
          letterInTile = letter.letter
          break
        }
      }
    }

    if (this.props.snake) {
      if (this.props.snakeFacing.x === 0 && this.props.snakeFacing.y === 1)
        image = "snakeDown.png"
      else if (this.props.snakeFacing.x === 0 && this.props.snakeFacing.y === -1)
        image = "snakeUp.png"
      else if (this.props.snakeFacing.x === 1 && this.props.snakeFacing.y === 0)
        image = "snakeRight.png"
      else if (this.props.snakeFacing.x === -1 && this.props.snakeFacing.y === 0)
        image = "snakeLeft.png"
    }
    return (
      <div className="tile">
        {letterInTile !== null ? letterInTile : <img src={require(`../images/${image}`)} alt="some thing"/>}
      </div>
    );
  }
}
