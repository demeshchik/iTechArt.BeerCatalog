import React from 'react';
import PropTypes from 'prop-types';

import './Tooltip.css';

const Tooltip = props =>
    (<span className={`tooltip__container ${props.class}`}>
        <i className="material-icons tooltip__icon">{props.text}</i>
        <span className="tooltip__body">{props.tooltip}</span>
    </span>);

Tooltip.defaultProps = {
    class: '',
};

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
    class: PropTypes.string,
};

export default Tooltip;