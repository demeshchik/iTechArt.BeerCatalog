import React from 'react'
import PropTypes from 'prop-types';

const ListItem = (props) => (
	<li className={props.class}>{props.children}</li>
);

ListItem.defaultProps = {
	class: '',
};

ListItem.propTypes = {
	class: PropTypes.string,
	children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default ListItem;