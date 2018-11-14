import React from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'

export default class Chatbox extends React.Component {
    render () {
        const {messages} = this.props
        return (
            <Card className='chatbox'>
                <div>
                    {messages.map(m=> <p>{m}</p>)}
                </div>
                <div className='row' onKeyDown={this.keyPressed}>
                    <input type='text' onChange={this.props.updateCurrentMessage} placeholder="hi idk snakes" value={this.props.currentMessage}/>
                    <Button variant="fab" className='chatbox-submit-btn' onClick={this.props.sendMessage} />
                </div>
            </Card>
        )
    }

    keyPressed = (event) => {
        if (event.key == "Enter")
            this.props.sendMessage()
    }
}
