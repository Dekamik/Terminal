import React from 'react';

class YR extends React.Component {
    render() {
        return (
            <section class="section">
                <div className="columns">
                    <div className="column">
                        <WeatherReport 
                            placeName={"Ursvik"}
                            placeSymbol="home"
                            currentReport={{temperature: "8", weather: "cloud-showers-heavy", wind: "1"}}
                            reports={[
                                {time: "00:00", weather: 'cloud-showers-heavy', temperatureHigh: "7", temperatureLow: "1", precipitation: "8", wind: "0"},
                                {time: "06:00", weather: "cloud-sun", temperatureHigh: "9", temperatureLow: "5", precipitation: "1", wind: "2"},
                                {time: "12:00", weather: "sun", temperatureHigh: "14", temperatureLow: "12", precipitation: "0", wind: "1"},
                                {time: "18:00", weather: "sun", temperatureHigh: "11", temperatureLow: "8", precipitation: "0", wind: "1"}
                            ]}/>
                    </div>
                    <div className="column">
                        <WeatherReport 
                            placeName="Vängsö"
                            placeSymbol="plane"
                            currentReport={{temperature: "7", weather: "cloud", wind: "3"}}
                            reports={[
                                {time: "00:00", weather: "cloud-showers-heavy", temperatureHigh: "5", temperatureLow: "-1", precipitation: "10", wind: "6"},
                                {time: "06:00", weather: "cloud", temperatureHigh: "6", temperatureLow: "4", precipitation: "2", wind: "4"},
                                {time: "12:00", weather: "sun", temperatureHigh: "13", temperatureLow: "11", precipitation: "0", wind: "2"},
                                {time: "18:00", weather: "sun", temperatureHigh: "10", temperatureLow: "7", precipitation: "0", wind: "4"}
                            ]}/>
                    </div>
                </div>
            </section>
        );
    }
}

class WeatherReport extends React.Component {
    render() {
        return (
            <div>
                <p className="title has-text-centered"><i className={"fas fa-" + this.props.placeSymbol}></i> {this.props.placeName}</p>
                <div className="columns has-text-centered">
                    <div className="column">
                        <p className="is-size-1"><i className={"fas fa-" + this.props.currentReport.weather}></i></p>
                    </div>
                    <div className="column">
                        <p className="is-size-2">{this.props.currentReport.temperature + "°"}</p>
                    </div>
                    <div className="column">
                        <p className="is-size-2">{this.props.currentReport.wind + " m/s"}</p>
                    </div>
                </div>
                <table className="table is-fullwidth">
                    <tbody>
                        {this.props.reports.map(r => <WeatherReportItem 
                            time={r.time} 
                            weather={r.weather} 
                            temperatureHigh={r.temperatureHigh} 
                            temperatureLow={r.temperatureLow} 
                            precipitation={r.precipitation}
                            wind={r.wind}/>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

class WeatherReportItem extends React.Component {
    render() {
        return (
            <tr className="is-size-4">
                <td className="has-text-weight-bold">{this.props.time}</td>
                <td><i className={"fas fa-" + this.props.weather}></i></td>
                <td className="has-text-weight-bold has-text-danger">{this.props.temperatureHigh + "°"}</td>
                <td className="has-text-weight-bold has-text-info">{this.props.temperatureLow + "°"}</td>
                <td>{this.props.precipitation + "mm"}</td>
                <td>{this.props.wind + " m/s"}</td>
            </tr>
        );
    }
}

export default YR;
