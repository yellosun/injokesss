import React, { Component } from 'react'
import './App.css'
import Board from './components/Board'
import Nav from './components/Nav'
import CurrentWord from './components/CurrentWord'
import CompletedWords from './components/CompletedWords'
import { injokes } from './data/injokes';

export default class Game extends Component {
    componentDidMount() {
        this.setState({
            snake: {
                facing: {x: 0, y: 1},
                history: [
                    {x: 5, y: 17},
                    {x: 4, y: 17},
                    {x: 4, y: 16},
                ]
            },
            currentWord: null,
            lettersCollected: [],
            wordsCompleted: ["booleanicing", "hell yeah", "word", "fuckingcompleted"],
            pickedWords: []
        })

        setInterval(this.runGameLoop, 100)
    }

    runGameLoop = () => {
        const { currentWord } = this.state

        this.updateSnakePosition()
        if (currentWord === null) {
            this.glitterMyBoard()
        }

        const letterNomd = this.onTopOfLetter()
        if (letterNomd !== undefined) {
            this.nomLetter(currentWord, letterNomd)
            if (this.currentWordIsComplete()) {
                this.finishWord()
            }
        }
    }

    currentWordIsComplete = () => {
        return this.state.lettersCollected.length === this.state.currentWord.word.length
    }

    finishWord = () => {
        const newWord = this.pickRandomWord()
        const newCurrentWord = this.makeCurrentWordObject(newWord)
        this.setState({
            wordsCompleted: [...this.state.wordsCompleted, this.state.lettersCollected.join("")],
            currentWord: newCurrentWord,
            lettersCollected: []
        })
    }

    makeCurrentWordObject = (word) => {
        const currentWord = {word: word, letters: []}
        const takenPositions = {}
        for (const letter of word.split("")) {
            const position = this.getRandomLetterPosition(takenPositions)
            takenPositions[JSON.stringify(position)] = true
            currentWord.letters.push({
                letter: letter,
                position: position,
                eaten: false
            })
        }
        return currentWord
    }

    pickRandomWord = () => {
        const validWords = injokes.filter(word => !this.state.pickedWords.includes(word))
        if (validWords.length > 0) {
            const word = validWords[Math.floor(Math.random() * validWords.length)]
            this.setState({pickedWords: [...this.state.pickedWords, word]})
            return word
        } else {
            console.error("idk deal with this later")
        }
    }

    nomLetter = (currentWord, letterNomd) => {
        const newLetter = {...letterNomd}
        newLetter.eaten = true

        const newCurrentWord = {...currentWord}
        newCurrentWord.letters = [...newCurrentWord.letters]
        newCurrentWord.letters[newCurrentWord.letters.indexOf(letterNomd)] = {...newLetter}
        this.setState({
            currentWord: newCurrentWord,
            lettersCollected: [...this.state.lettersCollected, letterNomd.letter]
        })
    }

    onTopOfLetter = () => {
        return (
            this.state.currentWord.letters.find(letter => {
                return letter.position.x === this.getSnakePosition().x &&
                       letter.position.y === this.getSnakePosition().y &&
                       !letter.eaten
            })
        )
    }

    glitterMyBoard = () => {
        const word = this.pickRandomWord()
        this.setState({currentWord: this.makeCurrentWordObject(word)})
    }

    getRandomLetterPosition = (takenPositions) => {
        let position = null
        let tries = 0
        while (tries < 50 && (position === null || takenPositions[JSON.stringify(position)] !== undefined)) {
            tries++
            position = {x: Math.floor(Math.random() * 20),
                        y: Math.floor(Math.random() * 20)}
        }
        return position
    }

    updateSnakePosition = () => {
        const snakeState = {...this.state.snake}
        const newPos = {x: this.getSnakePosition().x + this.state.snake.facing.x,
                        y: this.getSnakePosition().y + this.state.snake.facing.y}
        if (newPos.x > 19)
            newPos.x = 0
        if (newPos.x < 0)
            newPos.x = 19
        if (newPos.y > 19)
            newPos.y = 0
        if (newPos.y < 0)
            newPos.y = 19
        snakeState.history.unshift(newPos)
        this.setState({snake: snakeState})
    }

    getSnakePosition = () => {
        return this.state.snake.history[0]
    }

    onKeyDown = (event) => {
        const snakeState = {...this.state.snake}
        switch (event.key) {
            case "ArrowUp":
                snakeState.facing = {x: 0, y: -1}
                break;
            case "ArrowDown":
                snakeState.facing = {x: 0, y: 1}
                break;
            case "ArrowLeft":
                snakeState.facing = {x: -1, y: 0}
                break;
            case "ArrowRight":
                snakeState.facing = {x: 1, y: 0}
                break;
            default:

        }
        this.setState({snake: snakeState})
    }

    render() {
        if (this.state && this.state.snake && this.state.currentWord) {
            return (
                <div className = "App" tabIndex="0" onKeyDown={this.onKeyDown} >
                    <Nav />
                    <div className = 'row'>
                        <div className = 'column'>
                            <Board snakeHistory={this.state.snake.history}
                                   snakeFacing={this.state.snake.facing}
                                   currentWord={this.state.currentWord}
                                   lettersCollected={this.state.lettersCollected}
                                   className="board" />
                            <CurrentWord currentWord={this.state.currentWord}/>
                        </div>
                        <CompletedWords words={this.state.wordsCompleted} />
                    </div>
                </div>
            )
        } else {
            return "I dunno what's happening"
        }
    }
}
