import React from 'react'
import * as grid from '../grid.css'

export default class Tile extends React.Component {
    render() {
        return (
            <div className={grid['cl-md-3'] + " " + grid['cl-sm-5'] + " " + grid['cl-xs']}>
                Hello, my bitches!
            </div>
        )
    }
}