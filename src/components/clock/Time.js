import React from "react";
import "./DateExtensions";

class CurrentTime extends React.Component {
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
        <span className="time">
            {this.state.time.toLocaleTimeString("sv-se", {hour: "2-digit", minute: "2-digit"})}
        </span>
        );
    }
}

export default CurrentTime;
