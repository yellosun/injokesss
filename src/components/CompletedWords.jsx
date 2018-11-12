import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import PropTypes from 'prop-types'

const styles = {
    card: {
        minWidth: 275,
        height: 500
    },
    title: {
        fontSize: 20,
    },
    completed: {
        fontSize: 16,
        color: 'green',
    }
}

export default class CompletedWords extends Component {
    render() {
        return (
            <Card style={styles.card}>
                <div style={styles.title}>Completed</div>
                <div className="completed-list" style={styles.completed}>{this.props.words.map(word => <div>{word}<br/></div>)}</div>
            </Card>
        )
    }
}
