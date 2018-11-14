import React, { PureComponent } from 'react'
import Tile from './Tile'

export default class Row extends PureComponent {
  render() {
    const width = 20
    const tiles = []
    for (var x = 0; x < width; x++) {
      const entity = this.props.entities.find(entity => entity.position.x === x && entity.position.y === this.props.y)
      tiles.push(<Tile
                    x={x}
                    y={this.props.y}
                    key={x}
                    entity={entity}
                  />)
    }
    return (
      <div className="row">
          {tiles}
      </div>
    )
  }
}
