import React from 'react';
import { NextDeparture, ComingDepartures } from './SLDepartures';
import Deviations from './SLDeviations';

class SL extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextDeparture: {
                timeToDeparture: "",
                departureInfo: "",
                mode: ""
            },
            comingDepartures: [],
            deviations: []
        };
    }

    async componentDidMount() {
        this.getDepartures();
        this.getDeviations();
        this.departuresInterval = setInterval(() => { this.getDepartures() }, 10000);
        this.deviationsInterval = setInterval(() => { this.getDeviations() }, 300000);
    }

    componentWillUnmount() {
        clearInterval(this.departuresInterval);
        clearInterval(this.deviationsInterval);
    }

    render() {
        return (
            <section className="section">
                <div className="columns">
                    <div className="column">
                        <NextDeparture timeToDeparture={this.state.nextDeparture.timeToDeparture} departureInfo={this.state.nextDeparture.departureInfo} mode={this.state.nextDeparture.mode}/>
                    </div>
                    <div className="column is-size-4">
                        <ComingDepartures departures={this.state.comingDepartures}/>
                    </div>
                </div>
                <div>
                    <Deviations deviations={this.state.deviations}/>
                </div>
            </section>
        );
    }

    async getDepartures() {
        fetch("/departures")
            .then(response => response.json())
            .then(data => {
                if (data.ResponseData !== undefined)
                {
                    let buses = [];
                    for (let bus of data.ResponseData.Buses) {
                        buses.push({mode: "bus", line: bus.LineNumber, endStation: bus.Destination, departure: bus.DisplayTime})
                    }
                    if (buses.length !== 0)
                    {
                        this.setState({
                            nextDeparture: {
                                mode: "bus",
                                timeToDeparture: buses[0].departure,
                                departureInfo: buses[0].line + " mot " + buses[0].endStation
                            },
                            comingDepartures: buses.splice(1, 4),
                            deviations: this.state.deviations
                        });
                    }
                }
            });
    }

    async getDeviations() {
        fetch("/deviations")
            .then(response => response.json())
            .then(data => {
                let deviations = [];
                for (let deviation of data.ResponseData) {
                    deviations.push({title: deviation.Header, lines: deviation.Scope, class: deviation.MainNews ? "is-warning" : ""})
                }
                if (deviations.length !== 0)
                {
                    this.setState({
                        nextDeparture: this.state.nextDeparture,
                        comingDepartures: this.state.comingDepartures,
                        deviations: deviations
                    });
                }
            });
    }
}

export default SL;
