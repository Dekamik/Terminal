import React from "react";

class NextDeparture extends React.Component {
    render() {
        if (this.props.timeToDeparture == null) {
            return (
                <div className="title has-text-centered">
                    <p>Hämtar nästa avgång...</p>
                    <progress className="progress" max="100"></progress>
                </div>
            );
        }
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
        if (this.props.departures == null) {
            return (
                <div className="title has-text-centered">
                    <p>Hämtar kommande avgångar...</p>
                    <progress className="progress" max="100"></progress>
                </div>
            );
        }
        return (
            <div>
                <table className="table is-fullwidth is-narrow">
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
