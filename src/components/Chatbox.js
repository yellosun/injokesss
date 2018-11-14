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
                <div className='row'>
                    <input type='text' />
                    <Button variant="fab" className='chatbox-submit-btn'/>
                </div>
            </Card>
        )
    }
}
