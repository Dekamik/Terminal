import React from "react";
import "./DateExtensions";

class CurrentDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: new Date() };
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: new Date() }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
        <span className="date">
            {Date.dayName(this.state.time.getDay(), true)} den {this.state.time.getDate()}{Date.dateSuffix(this.state.time.getDate())} {Date.monthName(this.state.time.getMonth())} {this.state.time.getFullYear()}
        </span>
        );
    }
}

export default CurrentDate;
