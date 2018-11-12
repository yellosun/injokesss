import React, { Component } from 'react'
import Row from './Row'


export default class Board extends Component {
  render() {
    const height = 20
    const rows = []
    for (var y = 0; y < height; y++) {
      rows.push(<Row y={y}
                     key={y}
                     snakeHistory={this.props.snakeHistory} 
                     snakeFacing={this.props.snakeFacing} 
                     currentWord={this.props.currentWord}
                     lettersCollected={this.props.lettersCollected} />)
    }
    return (
      <div className="board">
          {rows}
      </div>
    );
  }
}
