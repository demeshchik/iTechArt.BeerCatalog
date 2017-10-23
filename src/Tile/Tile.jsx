import React from 'react'
import Button from '../Button/Button'
import * as grid from '../grid.css'
import * as styles from './styles.css'

export default class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.openAction = this.openAction.bind(this);
        this.faveAction = this.faveAction.bind(this);
        this.state = {
            isFave: false
        }
    }

    openAction() {
        alert("Open button pressed");
    }

    faveAction() {
        let faves = typeof localStorage.getItem('faves') !== 'string' ? [] : JSON.parse(localStorage.getItem('faves'));

        this.state.isFave ? faves.splice(faves.indexOf(this.props.tile.id), 1) : faves.push(this.props.tile.id);

        this.setState({
            isFave: !this.state.isFave
        }, () => {
            localStorage.setItem('faves', JSON.stringify(faves));
        });
    }

    render() {
        return (
            <div className={styles.tile + ' ' + grid['cl-xl-3'] + ' ' + grid['cl-masonry-sm'] + ' ' + grid['cl-xs']}>
                <div className={styles.tile__header}>
                    <img src={this.props.tile.image_url} className={grid['img-responsive']} />
                </div>
                <div className={styles.tile__content}>
                    <h3 className={styles.tile__title}>{this.props.tile.name}</h3>
                    <span className={styles.tile__tagline}>{this.props.tile.tagline}</span>
                    <div className={styles.tile__buttons + ' ' + grid['cl-xl-6'] + ' ' + grid['cl-lg-8'] + ' ' + grid['cl-xs']}>
                        <Button onClick={this.openAction}
                                title="open"
                                linkStyle={styles.tile__link}
                                buttonStyle={styles.tile__button} />
                        <Button onClick={this.faveAction}
                                title={this.state.isFave ? "remove favorite" : "favorite"}
                                linkStyle={styles.tile__link}
                                buttonStyle={styles.tile__button} />
                    </div>
                </div>
            </div>
        )
    }
}