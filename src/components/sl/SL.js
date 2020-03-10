import React from 'react';
import { NextDeparture, ComingDepartures } from './SLDepartures';
import Deviations from './SLDeviations';

class SL extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        this.getBusstop()
            .then(siteId => {
                this.siteId = siteId; 
                this.getDepartures(siteId);
            })
            .then(this.getDeviations());

        this.departuresInterval = setInterval(() => { this.getDepartures(this.siteId) }, process.env.REACT_APP_SL_REALTIME_REFRESH_MILLIS);
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
                    <p>Hämtar hållplats...</p>
                    <progress className="progress" max="100"></progress>
                </section>
            );
        }
        return (
            <section className="section">
                <div className="columns is-vcentered">
                    <div className="column">
                        <NextDeparture timeToDeparture={this.state.nextDeparture?.timeToDeparture} departureInfo={this.state.nextDeparture?.departureInfo} mode={this.state.nextDeparture?.mode}/>
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
        fetch(`/busstop?key=${process.env.REACT_APP_SL_PLACES_API_KEY}&searchstring=${process.env.REACT_APP_SL_PLACES_BUS_STOP_NAME}`)
            .then(response => response.json())
            .then(data => { this.siteId = data.ResponseData[0].SiteId; });
    }

    async getDepartures(siteId) {
        fetch(`/departures?key=${process.env.REACT_APP_SL_REALTIME_API_KEY}&siteid=${siteId}&timewindow=${process.env.REACT_APP_SL_REALTIME_TIME_WINDOW_MINS}`)
            .then(response => response.json())
            .then(data => {
                if (data.ResponseData != null)
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
                            comingDepartures: buses.splice(1, process.env.REACT_APP_SL_REALTIME_SHOW_AMOUNT),
                            deviations: this.state.deviations
                        });
                    }
                }
            });
    }

    async getDeviations() {
        fetch(`/deviations?key=${process.env.REACT_APP_SL_DEVIATIONS_API_KEY}&lineNumber=${process.env.REACT_APP_SL_DEVIATIONS_LINES}&transportMode=${process.env.REACT_APP_SL_DEVIATIONS_MODES}`)
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
