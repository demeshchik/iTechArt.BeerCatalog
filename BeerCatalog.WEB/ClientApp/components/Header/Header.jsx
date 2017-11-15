import React from 'react';
import Navbar from '../Navbar/Navbar';

import './Header.css';
import '../../grid.css';

//  TODO: Trying to change to stateless component

export default class Header extends React.PureComponent {
	constructor(props) {
		super(props);

		this.show = this.show.bind(this);
	}

	show() {
		this.menu.show();
	}

	render() {
		return (
			<header className="container">
				<div className="navbar row">
					<i className="fa fa-bars" aria-hidden="true" onClick={this.show} />

					<span className="title">Beer Catalog</span>
				</div>

				<Navbar ref={(refs) => { this.menu = refs; }} />
			</header>
		);
	}
}