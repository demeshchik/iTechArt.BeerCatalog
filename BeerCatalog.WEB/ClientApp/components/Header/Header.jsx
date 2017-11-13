/* eslint-disable react/no-string-refs */
import React from 'react';
import Menu from '../Menu/Menu';

import * as styles from './header.css';
import * as grid from '../../grid.css';

//  TODO: Trying to change to stateless component

export default class Header extends React.PureComponent {
	constructor(props) {
		super(props);

		this.show = this.show.bind(this);
	}

	show() {
		this.refs.menu.show();
	}

	render() {
		return (
			<header className={grid.container}>
				<div className={`${styles.navbar} ${grid.row}`}>
					<i className="fa fa-bars" aria-hidden="true" onClick={this.show} />

					<span className={styles.title}>Beer Catalog!</span>
				</div>

				<Menu ref="menu" />
			</header>
		);
	}
}