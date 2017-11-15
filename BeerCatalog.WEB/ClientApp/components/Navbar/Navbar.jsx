/* eslint-disable no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

export default class Navbar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
		};

		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
	}

	show() {
		this.setState({
			visible: true,
		});
		document.addEventListener('click', this.hide);
	}

	hide() {
		this.setState({
			visible: false,
		});

		document.removeEventListener('click', this.hide);
	}

	render() {
		return (
			<div className={`${this.state.visible ? "visible" : ""} sidenav`}>
				<ul className="navbar">
                    <li className="navbar__item"><Link to="/">Home</Link></li>
                    <li className="navbar__item"><Link to="/fave">Favorites</Link></li>
				</ul>
			</div>
		);
	}
}