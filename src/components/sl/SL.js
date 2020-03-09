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
        this.siteId = process.env.SL_PLACES_BUS_STOP_SITE_ID;
        if (this.siteId == null) {
            this.getBusstop()
                .then(siteId => {console.log("Site ID hämtad"); this.siteId = siteId})
                .then(() => {console.log("Avgångar hämtade"); this.getDepartures()})
                .then(() => {console.log("Konstigheter hämtade"); this.getDeviations()});
        }
        else {
            console.log("Sekundär");
            this.getDepartures();
            this.getDeviations();
        }

        this.departuresInterval = setInterval(() => { this.getDepartures() }, process.env.REACT_APP_SL_REAL_TIME_REFRESH_MILLIS);
        this.deviationsInterval = setInterval(() => { this.getDeviations() }, process.env.REACT_APP_SL_DEVIATIONS_REFRESH_MILLIS);
    }

    componentWillUnmount() {
        clearInterval(this.departuresInterval);
        clearInterval(this.deviationsInterval);
    }

    render() {
        if (this.siteId == null) {
            return (
                <section className="section">
                    <p>Laddar SL-data...</p>
                    <progress className="progress" max="100"></progress>
                </section>
            );
        }
        return (
            <section className="section">
                <div className="columns is-vcentered">
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

    async getBusstop() {
        fetch("/busstop")
            .then(response => response.json())
            .then(data => { this.siteId = data.ResponseData[0].SiteId; });
    }

    async getDepartures() {
        if (this.siteId == null) {
            return;
        }
        fetch(`/departures?siteId=${this.siteId}`)
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
        fetch(`/deviations`)
            .then(response => response.json())
            .then(data => {
                let deviations = [];
                for (let deviation of data.ResponseData) {
                    deviations.push({title: deviation.Header, lines: deviation.Scope, isDanger: deviation.MainNews, isWarning: SL.determineSeverity(deviation.Header), dateFrom: deviation.Created})
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

    static determineSeverity(header) {
        if (header.toLowerCase().indexOf('försen') !== -1
            || header.toLowerCase().indexOf('inställd') !== -1) {
            return true;
        }
        return false;
    }
}

export default SL;
