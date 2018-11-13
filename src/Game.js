import React, { Component } from 'react'
import './Game.css'
import Board from './components/Board'
import Nav from './components/Nav'
import CurrentWord from './components/CurrentWord'
import CompletedWords from './components/CompletedWords'

export default class Game extends Component {
    componentDidMount() {
        this.setupSocket()
    }

    setupSocket = () => {
        const url = "http://localhost:3000"
        // const url = "http://10.0.0.79:3000/"
        const socket = require('socket.io-client')(url);
        // socket.on('resourceGained', ({resourceType, amount, origin, totalResources}) => {
        // this.props.addResources(resourceType, amount, origin, new Date().getTime(), totalResources)
        // });
        // socket.on('buildingBuilt', ({buildings, resources}) => {
        // this.props.buildBuilding(buildings, resources)
        // });
        socket.on('initialLoadData', this.setStateFromSocket);
        socket.on('gameUpdate', this.setStateFromSocket);
        this.socket = socket
    }

    setStateFromSocket = (data) => {
        console.log("got some data")
        console.log({players: data.state, thisPlayer: data.state.find(player => player.socketId === data.socketId)})
        this.setState({players: data.state, thisPlayer: data.state.find(player => player.socketId === data.socketId)})
    }

    onKeyDown = (event) => {
        switch (event.key) {
            case "ArrowUp":
                this.socket.emit("changeFacing", {x: 0, y: -1})
                break;
            case "ArrowDown":
                this.socket.emit("changeFacing", {x: 0, y: 1})
                break;
            case "ArrowLeft":
                this.socket.emit("changeFacing", {x: -1, y: 0})
                break;
            case "ArrowRight":
                this.socket.emit("changeFacing", {x: 1, y: 0})
                break;
            default:
        }
    }

    render() {
        if (this.state && this.state.players && this.state.players.length > 0 && this.state.players[0].currentWord) {
            return (
                <div className = "App" tabIndex="0" onKeyDown={this.onKeyDown} >
                    <Nav />
                    <div className = 'row'>
                        <Board players={this.state.players} />
                        <div className = 'column'>
                            <CurrentWord currentWord={this.state.thisPlayer.currentWord} lettersCollected={this.state.thisPlayer.lettersCollected} />
                            <CompletedWords words={this.state.thisPlayer.wordsCompleted} />
                        </div>
                        <button onClick={() => this.socket.emit("pause")}>Pause</button>
                        <button onClick={() => this.socket.emit("resume")}>Resume</button>
                    </div>
                </div>
            )
        } else {
            return "I dunno what's happening"
        }
    }
}
