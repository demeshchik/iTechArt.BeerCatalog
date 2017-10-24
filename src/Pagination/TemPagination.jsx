import React from 'react'

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            pages: [],
            startPage: 1,
            endPage: 1
        };

        this.setPage = this.setPage.bind(this);
    }

    createPagination() {
        let totalCount = this.props.totalCount;
        let perPage = this.props.perPage;
        let totalPages = Math.ceil(totalCount / perPage);

        if (totalPages > 9) {
            let _ = require('underscore');
            let _pages = _.range(this.state.startPage + 1, this.state.endPage + 1);
        }
    }

    setPage(newPage) {
        if (newPage < 6) {
            this.setState({
                currentPage: newPage
            })
        }

        createPagination();

        this.props.onPageChange(newPage);
    }


    render() {
        return (
            <ul className={this.props.pgBarStyle}>
                {this.state.pages.map((page, index) =>
                    <li key={index} className={this.state.currentPage === page ? self.props.activePage : self.props.page}>
                        <a onClick={() => this.setPage(page)}>{page}</a>
                    </li>
                )}
            </ul>
        )
    }
}