import React, { Component } from 'react'
import { injokes } from '../data/injokes'
import Button from '@material-ui/core/Button'

const styles = {
    yes: {
        animation: 'blinker 500ms linear infinite',
    }
}

export default class Score extends Component {

  state = {
      green: false
  }

  render() {
    return (
        <div>
          <Button variant="fab" className="score" style={this.flashStyle()}>{ this.props.score }</Button>
        </div>
    )
  }

  flashStyle = () => {
       return this.state.green ? styles.yes : null
  }

  componentDidUpdate(prevProps) {
        if (prevProps.score < this.props.score) {
            this.setState({green: true})
            setTimeout(()=> this.setState({green: false}), 3000)
            return new Audio(require("../images/mlg-airhorn.mp3")).play()
        }
  }
}
