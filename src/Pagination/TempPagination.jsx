import React from 'react';
import * as styles from './styles.css'

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.pageChange = this.pageChange.bind(this);
        this.getPaginator = this.getPaginator.bind(this);

        let paginator = this.getPaginator(props.pagination);

        this.state = Object.assign({}, paginator);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pagination !== this.props.pagination) {
            let newState = Object.assign({}, this.getPaginator(nextProps.pagination));

            this.setState(newState);
        }
    }

    pageChange(event) {
        switch (event.target.parentElement.id) {
            case 'prevPage':
                this.props.onPageRequest(this.state.previousPage);
                break;
            case 'nextPage':
                this.props.onPageRequest(this.state.nextPage);
                break;
        }
    }

    getPaginator(pagination) {
        let allowPrevious = pagination.current_page !== 1;
        let allowNext = pagination.total_count === pagination.max_per_page;
        let firstPage = pagination.current_page === 1;
        let previousPage = pagination.current_page - 1;
        let nextPage = pagination.current_page + 1;

        return {
            allowPrevious,
            allowNext,
            firstPage,
            previousPage,
            nextPage
        }
    }

    render() {
        return (
            <ul className={styles.pager}>
                {!this.state.allowPrevious ? '' :
                    <li id="prevPage" onClick={this.pageChange}>
                        <a>&larr; Previous</a>
                    </li>
                }
                <li>
                    <div>
                        Displaying Results:&nbsp;
                        {this.state.firstPage ?
                            1 :
                            this.state.previousPage * this.props.pagination.max_per_page
                        }&nbsp; to &nbsp;{this.state.previousPage * this.props.pagination.max_per_page + this.props.pagination.total_count}&nbsp;
                    </div>
                </li>
                {!this.state.allowNext ? '' :
                    <li id="nextPage" onClick={this.pageChange}>
                        <a>Next &rarr;</a>
                    </li>
                }
            </ul>
        )
    }
}