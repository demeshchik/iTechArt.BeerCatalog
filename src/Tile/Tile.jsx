import React from 'react'
import * as grid from '../grid.css'
import * as styles from './styles.css'

export default class Tile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"tile " + grid['cl-md-3'] + " " + grid['cl-sm-5'] + " " + grid['cl-xs']}>
                <div className={styles.tile__header}>
                    <img src={this.props.tile.image_url} className={grid['img-responsive']} />
                </div>
                <div className={styles.tile__content}>
                    <h3 className={styles.tile__title}>{this.props.tile.name}</h3>
                    <span className={styles.tile__tagline}>{this.props.tile.tagline}</span>
                    <div className={styles.tile__buttons}>
                        Open, Close
                    </div>
                </div>
            </div>
        )
    }
}