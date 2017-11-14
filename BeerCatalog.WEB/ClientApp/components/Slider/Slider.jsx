/* eslint-disable react/jsx-indent-props */
import React from 'react';
import PropTypes from 'prop-types';

export default class Slider extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			value: event.target.value,
		}, this.props.onChange({ id: event.target.id, value: event.target.value }));
	}

	render() {
		return (
            <div className={this.props.containerStyle}>
                <div className={this.props.nameStyle}>{this.props.name}</div>
                <div className={this.props.sliderStyle}>
					<span>{this.state.value}</span>
					<input
						type="range"
						id={this.props.id}
						min={this.props.min}
						max={this.props.max}
						onMouseUp={this.handleChange}
						step={this.props.step ? this.props.step : 1}
					/>
				</div>
			</div>
		);
	}
}

Slider.defaultProps = {
    containerStyle: '',
    nameStyle: '',
    sliderStyle: '',
	name: '',
	id: '',
	min: 1,
	max: 10,
	step: 1,
};

Slider.propTypes = {
	onChange: PropTypes.func.isRequired,
    containerStyle: PropTypes.string,
    nameStyle: PropTypes.string,
    sliderStyle: PropTypes.string,
	name: PropTypes.string,
	id: PropTypes.string,
	min: PropTypes.string,
	max: PropTypes.string,
	step: PropTypes.string,
};