import React, { Component } from 'react'
import { injokes } from '../data/injokes';

export default class Score extends Component {
  render() {
    return (
      <h1>{this.calculateScore()}</h1>
    )
  }

  calculateScore = () => {
    let score = 0
    this.props.wordsCompleted.forEach(word => {if (injokes.includes(word)) score += word.length})
    return score
  }
}