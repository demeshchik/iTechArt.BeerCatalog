import React from 'react'
import { Link } from 'react-router-dom'
import * as styles from './styles.css'

//TODO: Fix Link to home page when app will be hosted on the server

export default class Menu extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    show() {
        this.setState({
            visible: true
        });
        document.addEventListener('click', this.hide);
    }

    hide() {
        this.setState({
            visible: false
        });
        document.removeEventListener("click", this.hide);
    }

    render() {
        return (
            <div className={(this.state.visible ? styles.visible : "") + " " + styles.sidenav}>
                <ul className={styles.navbar}>
                    <li className={styles.navbar__item}><Link to='/index.html'>Home</Link></li>
                    <li className={styles.navbar__item}><Link to='/fave'>Favorites</Link></li>
                </ul>
            </div>
        )
    }
}