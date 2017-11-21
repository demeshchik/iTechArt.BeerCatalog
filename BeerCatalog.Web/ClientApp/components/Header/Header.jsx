import React from 'react';
import Navbar from '../Navbar/Navbar';

import '../../grid.css';
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

			<Navbar ref={(refs) => { navRef = refs; }} />
		</header>
	);
};

export default Header;