import React, { Component } from 'react'
import { injokes } from '../data/injokes'

const styles = {
    yes: {
        animation: 'blinker 500ms linear infinite',
    }
}

export default class Score extends Component {

  render() {
    return (
      <div className="score" style={this.flashStyle()}>{ this.calculateScore() }</div>
    )
  }

  flashStyle = () => {
       if (this.calculateScore() > 0) {
            return styles.yes
      }
  }

  calculateScore = () => {
    let score = 0
    this.props.wordsCompleted.forEach(word => {if (injokes.includes(word)) score += word.length})
    return score
  }
}
