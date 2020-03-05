import React from 'react';

class YR extends React.Component {
    render() {
        return (
            <section class="section">
                <div className="columns">
                    <div className="column">
                        <WeatherReport placeName="Ursvik"
                            currentReport={{temperature: "8", weather: "Regn"}}
                            reports={[
                                {time: "00:00", weather: "Regn", temperatureHigh: "7", temperatureLow: "1", precipitation: "8"},
                                {time: "06:00", weather: "Brutna moln", temperatureHigh: "9", temperatureLow: "5", precipitation: "1"},
                                {time: "12:00", weather: "Klart", temperatureHigh: "14", temperatureLow: "12", precipitation: "0"},
                                {time: "18:00", weather: "Klart", temperatureHigh: "11", temperatureLow: "8", precipitation: "0"}
                            ]}/>
                    </div>
                    <div className="column">
                        <WeatherReport placeName="Vängsö"
                            currentReport={{temperature: "7", weather: "Regn"}}
                            reports={[
                                {time: "00:00", weather: "Regn", temperatureHigh: "5", temperatureLow: "-1", precipitation: "10"},
                                {time: "06:00", weather: "Brutna moln", temperatureHigh: "6", temperatureLow: "4", precipitation: "2"},
                                {time: "12:00", weather: "Klart", temperatureHigh: "13", temperatureLow: "11", precipitation: "0"},
                                {time: "18:00", weather: "Klart", temperatureHigh: "10", temperatureLow: "7", precipitation: "0"}
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
                <p className="title has-text-centered">{this.props.placeName}</p>
                <div className="columns has-text-centered">
                    <div className="column">
                        <p className="is-size-2">{this.props.currentReport.weather}</p>
                    </div>
                    <div className="column">
                        <p className="is-size-2">{this.props.currentReport.temperature + "°"}</p>
                    </div>
                </div>
                <table className="table is-fullwidth">
                    <tbody>
                        {this.props.reports.map(r => <WeatherReportItem 
                            time={r.time} 
                            weather={r.weather} 
                            temperatureHigh={r.temperatureHigh} 
                            temperatureLow={r.temperatureLow} 
                            precipitation={r.precipitation}/>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

class WeatherReportItem extends React.Component {
    render() {
        return (
            <tr>
                <td className="has-text-weight-bold">{this.props.time}</td>
                <td>{this.props.weather}</td>
                <td className="has-text-weight-bold has-text-danger">{this.props.temperatureHigh + "°"}</td>
                <td className="has-text-weight-bold has-text-info">{this.props.temperatureLow + "°"}</td>
                <td>{this.props.precipitation + "mm"}</td>
            </tr>
        );
    }
}

export default YR;
