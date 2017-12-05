import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Search from '../Search/Search';

import { loadBeers } from '../../actions/beerActions';

import '../../grid.css';
import './beersPage.css';

export function withBeersStore(WrappedComponent) {
    class HOCWrappedComponent extends React.Component {
        constructor(props) {
            super(props);

            this.data = {
                page: 0,
                queryPath: '',
            };

            this.searchHandler = this.searchHandler.bind(this);
            this.loadNewData = this.loadNewData.bind(this);
        }

        static get propTypes() {
            return {
                beerActions: PropTypes.func.isRequired,
                beers: PropTypes.object.isRequired,
                error: PropTypes.string.isRequired,
            }
        }

        loadNewData() {
            this.data.page++;
            this.props.beerActions(this.data.queryPath, this.data.page);
        }

        searchHandler(query) {
            this.data = {
                queryPath: query,
                page: 1,
            };
            this.props.beerActions(this.data.queryPath, this.data.page);
        }

        render() {
            const newProps = {
                data: this.props.beers.data,
                hasMore: this.props.beers.hasMore,
                loadData: this.loadNewData,
            };

            return (
                this.props.error
                    ? <span>{this.props.error}</span>
                    : <div className="cl-xl-offset-2 cl-lg-offset-1 cl-xl-6 cl-lg-8 cl-sm-10">
                        <div className="container">
                            <section className="catalog__search container">
                                <Search onSearch={this.searchHandler} />
                            </section>
                        </div>

                        <div className="container">
                            <section className="catalog__inner container">
                                <WrappedComponent {...this.props} {...newProps} />
                            </section>
                        </div>
                    </div>
            );
        }
    }

    function mapStateToProps(state) {
        return {
            beers: state.beers,
            error: state.error,
        };
    }

    function mapDispatchToProps(dispatch) {
        return {
            beerActions: bindActionCreators(loadBeers, dispatch),
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(HOCWrappedComponent);
}