import React from 'react'

export default class Slider extends React.Component {
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
        }, this.props.onChange(event.target.value));
    }

    render() {
        return (
            <div className={this.props.containerStyle}>
                <span>{this.props.name}</span>
                <div>
                    <span>{this.state.value}</span>
                    <input type="range"
                           min={this.props.min}
                           max={this.props.max}
                           onChange={this.handleChange}
                           step={this.props.step ? this.props.step : 1} />
                </div>
            </div>
        )
    }
}