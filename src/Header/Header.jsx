import React from 'react'
import Menu from '../Menu/Menu'
import * as styles from './styles.css'

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.show = this.show.bind(this);
    }

    show() {
        this.refs.menu.show();
    }

    render() {
        return (
            <header>
                <div className={styles.navbar}>
                    <i className="fa fa-bars" aria-hidden="true" onClick={this.show}></i>
                    <span className={styles.title}>Beer catalog</span>
                </div>
                <Menu ref="menu" />
            </header>
        )
    }
}