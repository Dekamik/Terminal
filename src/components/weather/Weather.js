import React from 'react';

class Weather extends React.Component {

    URSVIK = {
        lat: 59.3832,
        lon: 17.9577,
        msl: 36
    };

    VANGSO = {
        lat: 59.1000,
        lon: 17.2167,
        msl: 16
    };

    constructor(props) {
        super(props);
        this.setState({

        })
    }

    componentDidMount() {
        this.getWeather(this.URSVIK);
        this.getWeather(this.VANGSO);
        this.homeWeatherInterval = setInterval(() => { this.getWeather(this.URSVIK) }, 300000);
        this.airfieldWeatherInterval = setInterval(() => { this.getWeather(this.VANGSO) }, 300000);
    }

    componentWillUnmount() {
        clearInterval(this.homeWeatherInterval);
        clearInterval(this.airfieldWeatherInterval);
    }

    render() {
        return (
            <section className="section">
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

    async getWeather(place) {
        fetch(`/weather?lat=${place.lat}&lon=${place.lon}&msl=${place.msl}`)
            .then(response => response.text())
            .then(data => {
                console.log(data);
            });
    }

    static getSymbol(weatherStr) {

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
                        {this.props.reports.map((r, key) => <WeatherReportItem 
                            key={key}
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

export default Weather;
