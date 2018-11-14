import React, { Component } from 'react'
import './Game.css'

import Board from './components/Board'
import Nav from './components/Nav'
import CurrentWord from './components/CurrentWord'
import CompletedWords from './components/CompletedWords'
import Chatbox from './components/Chatbox'
import Timer from './components/Timer'

import Button from '@material-ui/core/Button'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'

export default class Game extends Component {
    componentDidMount() {
        this.setupSocket()
        this.setState({ messages: [] })
    }

    setupSocket = () => {
        // const url = "http://localhost:3000"
        const url = "http://10.185.4.122:3000/"
        const socket = require('socket.io-client')(url);
        socket.on('initialLoadData', this.setInitialState);
        socket.on('gameUpdate', this.setStateFromSocket);
        socket.on('messageSent', this.receiveMessage);
        this.socket = socket
    }

    setInitialState = (data) => {
        this.setState({socketId: data.socketId,
                       players: data.state.players,
                       thisPlayer: data.state.players.find(player => player.socketId === data.socketId),
                       timer: data.state.timer})
    }

    setStateFromSocket = (data) => {
        this.setState({players: data.state.players,
                        thisPlayer: data.state.players.find(player => player.socketId === this.state.socketId),
                        timer: data.state.timer})
    }

    receiveMessage = (message) => {
        this.setState({messages: [...this.state.messages, message]})
    }

    updateCurrentMessage = (event) => {
        this.setState({currentMessage: event.target.value})
        console.log(event.target.value)
    }

    sendMessage = () => {
        this.socket.emit("sendMessage", this.state.currentMessage)
        this.setState({currentMessage: ""})
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
                            <Timer timer={this.state.timer}/>
                            {this.state.thisPlayer !== undefined
                                ? <div><CurrentWord currentWord={this.state.thisPlayer.currentWord} lettersCollected={this.state.thisPlayer.lettersCollected} />
                                  <CompletedWords words={this.state.thisPlayer.wordsCompleted} /></div>
                                : <div><Chatbox messages={this.state.messages}
                                                currentMessage={this.state.currentMessage}
                                                sendMessage={this.sendMessage}
                                                updateCurrentMessage={this.updateCurrentMessage} />
                                  <Button variant="contained" className="join-btn" onClick={this.handleJoin}>Be One With The Snake</Button></div>
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
