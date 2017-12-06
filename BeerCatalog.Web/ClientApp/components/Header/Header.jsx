/* eslint-disable import/first */
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

import 'AppRoot/grid.css';
import './Header.css';

const Header = () => {
	let navRef = null;

	function show() {
		navRef.show();
	}

	return (
		<header className="container">
			<div className="navbar row">
				<i className="fa fa-bars" aria-hidden="true" onClick={show} />

				<span className="title">Beer Catalog</span>
			</div>

			<Sidebar ref={(refs) => { navRef = refs; }} />
		</header>
	);
};

export default Header;