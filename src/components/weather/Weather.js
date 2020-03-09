import React from 'react';
import './../clock/DateExtensions';

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
        this.state = {
            Ursvik: null,
            Vängsö: null
        };
    }

    componentDidMount() {
        this.updateWeather();
        this.interval = setInterval(() => { this.updateWeather() }, 150000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if (this.state.Ursvik == null || this.state.Vängsö == null) {
            return (
                <section className="section">
                    <div className="title has-text-centered">
                        <p>Laddar väderdata...</p>
                        <progress className="progress" max="100"></progress>
                    </div>
                </section>
            );
        }
        let ursvik = this.state.Ursvik;
        let vängsö = this.state.Vängsö;
        return (
            <section className="section">
                <div className="columns">
                    <div className="column">
                        <WeatherReport 
                            placeName={"Ursvik"}
                            placeSymbol="home"
                            currentReport={{temperature: ursvik.current?.temperature.value ?? "?", weather: Weather.getSymbol(ursvik.current.icon), wind: ursvik.current?.windSpeed.mps ?? "?"}}
                            reports={ursvik.forecast.map(f => ({
                                time: Weather.getLocalizedTime(f.from), 
                                weather: Weather.getSymbol(f.icon), 
                                temperatureHigh: f.maxTemperature?.value ?? f.temperature?.value ?? "?",
                                temperatureLow: f.minTemperature?.value ?? f.temperature?.value ?? "?",
                                precipitation: f.rainDetails?.rain ?? "0",
                                wind: f.windSpeed?.mps ?? "0" }))}/>
                    </div>
                    <div className="column">
                        <WeatherReport 
                            placeName="Vängsö"
                            placeSymbol="plane"
                            currentReport={{temperature: vängsö.current?.temperature.value ?? "?", weather: Weather.getSymbol(vängsö.current.icon), wind: vängsö.current?.windSpeed.mps ?? "?"}}
                            reports={vängsö.forecast.map(f => ({
                                time: Weather.getLocalizedTime(f.from), 
                                weather: Weather.getSymbol(f.icon), 
                                temperatureHigh: f.maxTemperature?.value ?? f.temperature?.value ?? "?",
                                temperatureLow: f.minTemperature?.value ?? f.temperature?.value ?? "?",
                                precipitation: f.rainDetails.rain,
                                wind: f.windSpeed.mps }))}/>
                    </div>
                </div>
            </section>
        );
    }

    async updateWeather() {
        await fetch(`/weather?lat=${this.URSVIK.lat}&lon=${this.URSVIK.lon}&msl=${this.URSVIK.msl}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    Ursvik: data,
                    Vängsö: this.state.Vängsö
                });
            });
        await fetch(`/weather?lat=${this.VANGSO.lat}&lon=${this.VANGSO.lon}&msl=${this.VANGSO.msl}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    Ursvik: this.state.Ursvik,
                    Vängsö: data
                });
            });
    }

    static getSymbol(forecast) {
        switch (forecast) {
            case 'Sun':
                return 'sun';

            case "PartlyCloud":
            case "LightCloud":
                return "cloud-sun";

            case "Cloud":
                return "cloud";

            case "Snow":
                return "snowflake";
            
            case "LightRain":
            case "Rain":
                return "cloud-showers-heavy";
            
            default:
                console.log("Missing icon for ", forecast);
                break;
        }
    }

    static getLocalizedTime(timeStr) {
        let date = new Date(timeStr);
        return `${Date.dayShortName(date.getDay())} ${date.getDate()}/${date.getMonth() + 1}`;
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
            <tr className="is-size-5">
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
