/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types';

import './ListItem.css';

const ListItem = (props) => (
	<li className={props.class}>{props.children}</li>
);

ListItem.defaultProps = {
	class: 'list-item',
};

ListItem.propTypes = {
	class: PropTypes.string,
	children: PropTypes.object.isRequired,
};

export default ListItem;