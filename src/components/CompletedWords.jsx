import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import Score from '../components/Score'
import { injokes } from '../data/injokes'

const styles = {
    completed: {
        fontSize: 16,
        color: '#33ab9f',
        paddingTop: 20,
    },
    ruined: {
        fontSize: 16,
        color: 'red',
        paddingTop: 20,
    }
}

export default class CompletedWords extends Component {
    render() {
        return (
            <Card className="completed-card">
                <div className='card-header'>
                    <div className="card-title">Completed</div>
                    <Score score={this.props.score}/>
                </div>

                <div>
                    {this.props.words.map(word => {
                        if (injokes.includes(word)) {
                            return <div key={word} style={styles.completed}>{word}</div>
                        } else {
                            return <div key={word} style={styles.ruined}>{word}</div>
                        }

                    })}
                </div>
            </Card>
        )
    }
}
