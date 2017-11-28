import React from 'react';
import PropType from 'prop-types';

import './List.css';

const List = (props) => {
	return (
		<ul className={'list ' + props.class}>
			{props.children}
		</ul>
	)
};

List.defaultProps = {
	class: '',
};
List.propTypes = {
	class: PropType.string,
	children: PropType.arrayOf(PropType.element).isRequired,
};

export default List;