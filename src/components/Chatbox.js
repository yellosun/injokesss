import React from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'

export default class Chatbox extends React.Component {
    render () {

        const {messages} = this.props
        return (
            <Card className='chatbox'>
                <div className='message-box'>
                    {messages.map(m=> <p>{m}</p>)}
                </div>
                <div className='row message' onKeyDown={this.keyPressed}>
                    <input type='text' onChange={this.props.updateCurrentMessage} placeholder="Enter injoke vote" value={this.props.currentMessage}/>
                    <Button variant="fab" className='chatbox-submit-btn' onClick={this.props.sendMessage}><SendIcon/></Button>
                </div>
            </Card>
        )
    }

    keyPressed = (event) => {
        if (event.key === "Enter")
            this.props.sendMessage()
    }
}
