import React, { Component } from 'react'
import './App.css'
import Board from './components/Board'
import Nav from './components/Nav'
import CurrentWord from './components/CurrentWord'
import CompletedWords from './components/CompletedWords'

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
            injokes: [
                "thejonathan",
                "welcome,",
                "hormones",
                "woich",
                "injoke",
                "booleanicing",
                "sneezecounttwo",
                "smoothyisthicc",
                "flowflowflow",
                "herpe",
                "forkreposgitmoney",
                "twoandawoo",
                "ghostsushi",
                "bananas",
                "cake",
                "vent",
                "tank",
                "friendship",
                "ilovemyjob",
                "leaderboard",
                "cookies",
                "finger",
                "howwastrivia",
                "blaugs",
                "pong",
                "orangeroughness"
            ],
            currentWord: null,
            lettersCollected: ["o"],
        })

        setInterval(this.runGameLoop, 300)
    }

    runGameLoop = () => {
        this.updateSnakePosition()
        if (this.state.currentWord === null /*|| this.state.lettersCollected.length === this.state.currentWord.word.length*/) {
            this.glitterMyBoard()
        }
    }

    glitterMyBoard = () => {
        const takenPositions = {}
        const word = this.state.injokes[Math.floor(Math.random() * this.state.injokes.length)]
        const newCurrentWord = {word: word, letters: []}
        for (const letter of word.split("")) {
            const position = this.getRandomLetterPosition(takenPositions)
            takenPositions[JSON.stringify(position)] = true
            newCurrentWord.letters.push({
                letter: letter,
                position: position
            })
        }
        this.setState({currentWord: newCurrentWord})
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
        snakeState.history.push(newPos)
        this.setState({snake: snakeState})
    }

    getSnakePosition = () => {
        return this.state.snake.history[this.state.snake.history.length - 1]
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
        if (this.state && this.state.snake) {
            console.log(this.state.currentWord)
            return (
                <div className = "App" tabIndex="0" onKeyDown={this.onKeyDown} >
                    <Nav />
                    <div className = 'row'>
                        <div className = 'column'>
                            <Board snakePos={this.getSnakePosition()}
                                   snakeFacing={this.state.snake.facing}
                                   currentWord={this.state.currentWord} />
                            <CurrentWord />
                        </div>
                        <CompletedWords />
                    </div>
                </div>
            )
        } else {
            return "I dunno what's happening"
        }
    }
}
