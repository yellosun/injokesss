import React, { Component } from 'react'
import './Game.css'
import Board from './components/Board'
import Nav from './components/Nav'
import CurrentWord from './components/CurrentWord'
import CompletedWords from './components/CompletedWords'
import Button from '@material-ui/core/Button'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'

export default class Game extends Component {
    componentDidMount() {
        this.setupSocket()
    }

    setupSocket = () => {
        // const url = "http://localhost:3000"
        const url = "http://10.185.4.165:3000/"
        const socket = require('socket.io-client')(url);
        socket.on('initialLoadData', this.setInitialState);
        socket.on('gameUpdate', this.setStateFromSocket);
        this.socket = socket
    }

    setInitialState = (data) => {
        this.setState({socketId: data.socketId,
                       players: data.state,
                       thisPlayer: data.state.find(player => player.socketId === data.socketId)})
    }

    setStateFromSocket = (data) => {
        this.setState({players: data.state, thisPlayer: data.state.find(player => player.socketId === this.state.socketId)})
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

    handleButton = () => {
        new Audio(require("./images/mlg-airhorn.mp3")).play()
    }

    handleJoin = () => {
        this.socket.emit("joinGame")
    }

    render() {
        if (this.state && this.state.players) {
            return (
                <div className = "App" tabIndex="0" onKeyDown={this.onKeyDown} >
                    <Nav />
                    <div className = 'row'>
                        <div className = 'column'>
                            <Board players={this.state.players} />
                            <div className="row buttons">
                                <Button variant="fab" className="play-btn" onClick={() => this.socket.emit("resume")}><PlayArrowIcon /></Button>
                                <Button variant="fab" className="pause-btn" onClick={() => this.socket.emit("pause")}><PauseIcon /></Button>
                            </div>
                        </div>
                        <div className = 'column'>
                            {this.state.thisPlayer !== undefined
                                ? <div><CurrentWord currentWord={this.state.thisPlayer.currentWord} lettersCollected={this.state.thisPlayer.lettersCollected} />
                                  <CompletedWords words={this.state.thisPlayer.wordsCompleted} /></div>
                                : <Button variant="contained" className="join-btn" onClick={this.handleJoin}>Be One With The Snake</Button>
                            }
                        </div>

                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div>I dunno what's happening</div>
                    <button onClick={this.handleButton}>play horn</button>
                </div>
            )
        }
    }
}
