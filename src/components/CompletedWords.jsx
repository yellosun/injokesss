import React, { Component } from 'react'

export default class CompletedWords extends Component {
  render() {
    return (
      this.props.words.map(word => <div>{word}</div>)
    );
  }
}
