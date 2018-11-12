import React, { Component } from 'react'

export default class CurrentWord extends Component {
  render() {
    return (
      <div className="current-word"><h1>{this.props.currentWord.word}</h1></div>
    );
  }
}
