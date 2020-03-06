import React from "react";

class Deviations extends React.Component {
    render() {
        return (
            <div className="tile is-ancestor" style={{'flexWrap': 'wrap'}}>
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
            <div className="tile is-parent is-4">
                <div className={"tile is-child notification " + this.props.class}>
                    <p className="title is-size-4">
                        {this.state.title}
                    </p>
                    <p className="subtitle is-size-5">
                        {this.state.lines}
                    </p>
                </div>
            </div>
        );
    }
}

export default Deviations;
