/* eslint-disable import/prefer-default-export */
import React from 'react';

export function baseHOC(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                count: 0,
            };

            this.counter = this.counter.bind(this);
        }

        counter() {
            this.setState({
                count: this.state.count + 1,
            });
        }

        render() {
            return (
                <div>
                    This is counter of clicking on the BASE component: {this.state.count}
                    <WrappedComponent onClick={this.counter} />
                </div>
            );
        }
    };
}

export function advancedHOC(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                color: 'red',
            };

            this.counter = this.counter.bind(this);
        }

        counter() {
            this.setState({
                color: this.state.color === 'red' ? 'blue' : 'red',
            });
        }

        render() {
            const styles = {
                color: this.state.color
            }

            return (
                <div style={styles}>
                    This is and example of advanced HOC
                    <WrappedComponent onClick={this.counter} />
                </div>
            );
        }
    };
}