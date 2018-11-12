import React, { Component } from 'react'
import Card from '@material-ui/core/Card'

export default class CurrentWord extends Component {
  render() {
    return (
      <div className={this.props.currentWord.word === "isthatpapyrus" ? "current-word papyrus" : "current-word"}>
          <Card className="current-card">
              <div className="current-header">Your current word is:</div>
              <h1>{this.props.currentWord.word}</h1>
          </Card>
      </div>
    );
  }
}
