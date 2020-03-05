import React from "react";

class NextDeparture extends React.Component {
    render() {
        return (
            <div className="has-text-centered">
                <p className="is-size-1">{this.props.timeToDeparture}</p>
                <p className="is-size-3">{this.props.departureInfo}</p>
            </div>
        );
    }
}

class ComingDepartures extends React.Component {
    render() {
        return (
            <div>
                <table class="table is-fullwidth">
                    <tbody>
                        {this.props.departures.map(d => <ComingDepartureItem mode={d.mode} line={d.line} endStation={d.endStation} departure={d.departure}/>)}
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
                <td>{this.props.mode}</td>
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
