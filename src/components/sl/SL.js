import React from 'react';
import { NextDeparture, ComingDepartures } from './SLDepartures';
import Deviations from './SLDeviations';

class SL extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextDeparture: {
                timeToDeparture: "Nu",
                departureInfo: "504 mot Rissne",
                mode: "bus"
            },
            comingDepartures: [
                { mode: "bus", line: "504", endStation: "Sundbybergs station", departure: "4 min" },
                { mode: "bus", line: "504", endStation: "Rissne", departure: "15 min" },
                { mode: "bus", line: "504", endStation: "Sundbybergs station", departure: "19 min" },
                { mode: "bus", line: "504", endStation: "Rissne", departure: "10:52" },
            ],
            deviations: [
                { title: "Coronavirusutbrott", lines: "Tunnelbanans blåa linje", class: "is-danger"},
                { title: "Vettvilling springer runt med saxar", lines: "Buss 504", class: "is-warning"},
                { title: "Vattenplaning", lines: "Buss 504"},
                { title: "50 hökar attackerar småbarn", lines: "Buss 504"}
            ]
        };
    }

    render() {
        return (
            <section className="section">
                <div className="columns">
                    <div className="column">
                        <NextDeparture timeToDeparture={this.state.nextDeparture.timeToDeparture} departureInfo={this.state.nextDeparture.departureInfo} mode={this.state.nextDeparture.mode}/>
                    </div>
                    <div className="column">
                        <ComingDepartures departures={this.state.comingDepartures}/>
                    </div>
                </div>
                <div>
                    <Deviations deviations={this.state.deviations}/>
                </div>
            </section>
        );
    }
}

export default SL;
