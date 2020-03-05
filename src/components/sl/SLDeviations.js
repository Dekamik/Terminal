import React from "react";

class Deviations extends React.Component {
    render() {
        return (
            <div>
                <DeviationCard title="Coronavirusutbrott" lines="Tunnelbanans blåa linje"/>
                <DeviationCard title="Vettvilling springer runt med saxar" lines="Buss 504"/>
            </div>
        );
    }
}

class DeviationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            lines: props.lines
        };
    }

    render() {
        return (
            <div className="card">
                <div class="card-content">
                    <p class="title">
                        {this.state.title}
                    </p>
                    <p class="subtitle">
                        {this.state.lines}
                    </p>
                </div>
            </div>
        );
    }
}

export default Deviations;
