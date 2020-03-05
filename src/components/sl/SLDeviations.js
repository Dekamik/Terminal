import React from "react";

class Deviations extends React.Component {
    render() {
        return (
            <div className="tile is-ancestor" style={{'flex-wrap': 'wrap'}}>
                {this.props.deviations.map(d => <DeviationCard title={d.title} lines={d.lines} class={d.class}/>)}
            </div>
        );
    }
}

class DeviationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            lines: props.lines,
            colorClass: props.colorClass
        };
    }

    render() {
        return (
            <div className={"tile is-child notification is-4 " + this.props.class}>
                <p className="title">
                    {this.state.title}
                </p>
                <p className="subtitle">
                    {this.state.lines}
                </p>
            </div>
        );
    }
}

export default Deviations;
