import React, { Component } from 'react'

export default class CurrentWord extends Component {
  render() {
    return (
      <div className={this.props.currentWord.word === "isthatpapyrus" ? "current-word papyrus" : "current-word"}><h1>{this.props.currentWord.word}</h1></div>
    );
  }
}
