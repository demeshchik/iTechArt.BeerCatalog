import React from 'react'
import * as grid from '../grid.css'
import * as styles from './styles.css'

export default class Search extends React.Component {
    render() {
        return (
            <div className={styles.search}>
                <input className={styles.search__field + ' ' + grid['cl-xl-3']} type="search" placeholder="Search beers..." />
                <i className={'fa fa-search ' + styles.search__icon} aria-hidden="true"></i>
            </div>
        )
    }
}