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
    }

    render() {
        return (
            <div className = "App" >
                <Nav />
                <div className = 'row'>
                    <div className = 'column'>
                        <Board />
                        <CurrentWord />
                    </div>
                    <CompletedWords />
                </div>
            </div>
        )
    }
}
