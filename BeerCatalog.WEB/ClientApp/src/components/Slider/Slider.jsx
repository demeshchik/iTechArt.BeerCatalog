import React from 'react'

export default class Slider extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        }, this.props.onChange({id:event.target.id, value: event.target.value}));
    }

    render() {
        return (
            <div className={this.props.containerStyle}>
                <span>{this.props.name}</span>
                <div>
                    <span>{this.state.value}</span>
                    <input type="range"
                           id={this.props.id}
                           min={this.props.min}
                           max={this.props.max}
                           onMouseUp={this.handleChange}
                           step={this.props.step ? this.props.step : 1} />
                </div>
            </div>
        )
    }
}