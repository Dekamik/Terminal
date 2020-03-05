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
        this.refreshState();
        this.interval = setInterval(() => { this.refreshState() }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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

    async refreshState() {
        let departures = await this.getDepartures();
        let nextDeparture = departures[0];
        this.setState({
            nextDeparture: {
                timeToDeparture: nextDeparture.departure,
                departureInfo: nextDeparture.line + " mot " + nextDeparture.endStation,
                mode: "bus"
            },
            comingDepartures: departures.splice(1, 4),
            deviations: [
                { title: "Coronavirusutbrott", lines: "Tunnelbanans blåa linje", class: "is-danger"},
                { title: "Vettvilling springer runt med saxar", lines: "Buss 504", class: "is-warning"},
                { title: "Vattenplaning", lines: "Buss 504"},
                { title: "50 hökar attackerar småbarn", lines: "Buss 504"}
            ]
        });
    }

    async getDepartures() {
        fetch("/departures")
            .then()
        let response = await fetch("/departures");
        let result = await response.json();
        let buses = [];
        for (let bus of result.ResponseData.Buses) {
            buses.push({mode: "bus", line: bus.LineNumber, endStation: bus.Destination, departure: bus.DisplayTime});
        }
        return buses.splice(0, 5);
    }

    getDeviations() {

    }
}

export default SL;
