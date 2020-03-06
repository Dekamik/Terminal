import React from "react";

class NextDeparture extends React.Component {
    render() {
        // TODO: Fix the icons className.
        return (
            <div className="has-text-centered">
                <p className="is-size-1">{this.props.timeToDeparture}</p>
                <p className="is-size-3"><i className={"fas fa-bus has-text-danger"}></i> {this.props.departureInfo}</p>
            </div>
        );
    }
}

class ComingDepartures extends React.Component {
    render() {
        return (
            <div>
                <table className="table is-fullwidth">
                    <tbody>
                        {this.props.departures.map((d, key) => <ComingDepartureItem key={key} mode={d.mode} line={d.line} endStation={d.endStation} departure={d.departure}/>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

class ComingDepartureItem extends React.Component {
    render() {
        return (
            <tr>
                <td><i className={"fas fa-" + this.props.mode + " has-text-danger"}></i></td>
                <td>{this.props.line}</td>
                <td>{this.props.endStation}</td>
                <td>{this.props.departure}</td>
            </tr>
        );
    }
}

export {
    NextDeparture,
    ComingDepartures
}
