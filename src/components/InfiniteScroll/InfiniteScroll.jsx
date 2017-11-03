import React from 'react'

export default class InfiniteScroll extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnScroll = this.handleOnScroll.bind(this);
    }

    componentWillMount() {
        if (this.props.initialLoading)
            this.props.loadData();
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleOnScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleOnScroll);
    }

    handleOnScroll() {
        if (this.props.hasMore) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                this.props.loadData();
            }
        }
        else
            window.removeEventListener('scroll', this.handleOnScroll);
    }

    render() {
        return (
            <div className="data-container">
                {this.props.children}
            </div>
        )
    }
}