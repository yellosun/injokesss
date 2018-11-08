import React, { Component } from 'react'

export default class Tile extends Component {
  render() {
    let image = "woodTile.jpg"
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
        <img src={require(`../images/${image}`)} alt="some thing"/>
      </div>
    );
  }
}
