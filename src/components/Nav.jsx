import React, {Component} from 'react'

export default class Nav extends Component {
    render() {
        return (<div className="nav">
            <div className="nav-secondary"></div>
            <div className='nav-primary'>
                <img src={require("../images/snake.png")}/>
                <div className='nav-title'>injokesss</div>
            </div>
        </div>)
    }
}
