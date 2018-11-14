import React, { Component, PureComponent } from 'react'

export default class Tile extends PureComponent {
  render() {
    let image = "woodTile.jpg"
    
    const entity = this.props.entity
    if (entity !== undefined) {
      switch (entity.type) {
        case "collectedLetter":
          return <div className="lettered-tile" style={{"background-color": entity.color}}>{entity.letter}</div>
        case "letterOnBoard":
          return <div className="lettered-tile">{entity.letter}</div>
        case "snake":
          if (entity.facing.x === 0 && entity.facing.y === 1)
            image = "snakeDown.png"
          else if (entity.facing.x === 0 && entity.facing.y === -1)
            image = "snakeUp.png"
          else if (entity.facing.x === 1 && entity.facing.y === 0)
            image = "snakeRight.png"
          else if (entity.facing.x === -1 && entity.facing.y === 0)
            image = "snakeLeft.png"
          break
        default:
      }
    }

    return <div className="tile"><img src={require(`../images/${image}`)} alt="some thing"/></div>
  }
}
