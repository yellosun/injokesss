import React, { Component } from 'react'
import Card from '@material-ui/core/Card'

export default class CurrentWord extends Component {
  render() {
    const {lettersCollected, currentWord} = this.props

    return (
        <div className={this.props.currentWord !== null && this.props.currentWord.word === "isthatpapyrus"
                            ? "current-word papyrus"
                            : "current-word"}>
          <Card className="current-card">
              {currentWord !== null
                ? 
                <div>
                    <div className="current-header">Your current word is:</div>
                    <h1>{this.highlightedLetters(currentWord.word, lettersCollected).map(
                        letter => <span className={letter.highlighted ? "green" : "iunno"}>{letter.letter}</span>
                    )}</h1>
                </div>
                :
                <div className="current-header">Snakeeeeeeeeeeeeeeeeeeess</div>
              }
          </Card>
      </div>
    );
  }

  highlightedLetters = (word, collectedLetters) => {
      collectedLetters = [...collectedLetters]
      const highlightedLetters = []
      const lettersInWord = word.split("")
      for (const letterInWord of lettersInWord) {
          if (collectedLetters.includes(letterInWord)) {
              highlightedLetters.push({highlighted: true, letter: letterInWord})
              collectedLetters.splice(collectedLetters.indexOf(letterInWord), 1)
          } else {
              highlightedLetters.push({highlighted: false, letter: letterInWord})
          }
      }
      return highlightedLetters
  }
}
