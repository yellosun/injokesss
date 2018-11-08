import React, { Component } from 'react'
import './App.css'
import Board from './components/Board'
import Nav from './components/Nav'
import CurrentWord from './components/CurrentWord'
import CompletedWords from './components/CompletedWords'

export default class Game extends Component {
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
