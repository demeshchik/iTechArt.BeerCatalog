import React from 'react'

export default class Button extends React.Component {
    render() {
        return (
            <span className={this.props.buttonStyle}>
                <a onClick={this.props.onClick} className={this.props.linkStyle}>{this.props.title}</a>
            </span>
        )
    }
}