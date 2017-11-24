import React from 'react'

const ListItem = (props) => (
	<li className={props.class}>{props.children}</li>
);

export default ListItem;