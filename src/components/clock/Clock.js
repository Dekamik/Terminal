import React from "react";
import "./DateExtensions";

class Clock extends React.Component {
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
        <span className="clock">
            <h1 className="time">{this.state.time.toLocaleTimeString("sv-se", {hour: "2-digit", minute: "2-digit"})}</h1>
            <h3 className="date">{Date.dayName(this.state.time.getDay(), true)} den {this.state.time.getDate()}{Date.dateSuffix(this.state.time.getDate())} {Date.monthName(this.state.time.getMonth())} {this.state.time.getFullYear()}</h3>
        </span>
        );
    }
}

export default Clock;
