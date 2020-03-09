import React from "react";

class Deviations extends React.Component {



    componentDidMount() {
        this.setState({isLoaded: true})
    }

    render() {
        return (
            <div>
                <div className="tile is-ancestor" style={{'flexWrap': 'wrap'}}>
                    {this.props.deviations.sort((a, b) => a.title.length - b.title.length)
                        .sort((a, b) => b.dateFrom - a.dateFrom)
                        .sort((a, b) => b.isWarning - a.isWarning)
                        .sort((a, b) => b.isDanger - a.isDanger)
                        .map((d, key) => <DeviationCard key={key} title={d.title} lines={d.lines} isWarning={d.isWarning} isDanger={d.isDanger}/> )}
                </div>
                <div>
                    {this.props.deviations.map((d, key) => <DeviationModal key={key} title={d.title} lines={d.lines} details={d.details}/>)}
                </div>
            </div>
        );
    }
}

class DeviationCard extends React.Component {
    render() {
        let colorClass = this.props.isDanger ? "is-danger" : 
                        this.props.isWarning ? "is-warning" : "is-info";
        return (
            <div className="tile is-parent is-4">
                <div className={"tile is-child notification " + colorClass} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <p className="title is-size-4">
                        {this.props.title}
                    </p>
                    <p className="subtitle is-size-5">
                        {this.props.lines}
                    </p>
                    <button className={`button is-inverted ${colorClass} is-fullwidth`}>Mer information</button>
                </div>
            </div>
        );
    }
}

class DeviationModal extends React.Component {
    render() {
        return (
            <div className="modal">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-hard-head">
                        <p className="modal-card-title">{this.props.title}</p>
                        <button className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        {this.props.details}
                    </section>
                    <footer className="modal-card-foot">
                        Påverkar följande färdmedel: {this.props.lines}
                    </footer>
                </div>
            </div>
        );
    }
}

export default Deviations;
