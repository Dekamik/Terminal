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

    async refreshState() {
        await this.getDepartures();
        await this.getDeviations();
    }

    async getDepartures() {
        fetch("/departures")
            .then(response => response.json())
            .then(data => {
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
            });
    }

    async getDeviations() {

    }
}

export default SL;
