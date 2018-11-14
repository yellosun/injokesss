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
        <div>
          <div className="score" style={this.flashStyle()}>{ this.calculateScore() }</div>
        </div>
    )
  }

  flashStyle = () => {
       if (this.calculateScore() > 0) {
            return styles.yes
      }
  }

  componentDidUpdate(prevProps) {
        if (prevProps.wordsCompleted.length < this.props.wordsCompleted.length) {
            let word = this.props.wordsCompleted[this.props.wordsCompleted.length - 1]
            if (injokes.includes(word)) {
                return new Audio(require("../images/mlg-airhorn.mp3")).play()
            }
        }
  }

  calculateScore = () => {
    let score = 0
    this.props.wordsCompleted.forEach(word => {if (injokes.includes(word)) score += word.length})
    return score
  }
}
