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
            injokes: [],
            currentWord: {
                word: "flow",
                letters: [
                    {
                        letter: "f",
                        position: {x: 10, y: 5}
                    },
                    {
                        letter: "l",
                        position: {x: 10, y: 5}
                    },
                    {
                        letter: "w",
                        position: {x: 10, y: 5}
                    },
                ]
            },
            lettersCollected: ["o"],
        })

        setInterval(() => {
            console.log(this.getSnakePosition())
            const snakeState = {...this.state.snake}
            snakeState.history.push({x: this.getSnakePosition().x + this.state.snake.facing.x,
                                     y: this.getSnakePosition().y + this.state.snake.facing.y})
            this.setState({snake: snakeState})
        }, 100)
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
            return (
                <div className = "App" tabIndex="0" onKeyDown={this.onKeyDown} >
                    <Nav />
                    <div className = 'row'>
                        <div className = 'column'>
                            <Board snakePos={this.getSnakePosition()}/>
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
