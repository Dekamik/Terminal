import React from "react";
import CurrentDate from "./../clock/Date";
import CurrentTime from "./../clock/Time";

class Navbar extends React.Component {
    render() {
        return (
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-menu">
                    <div className="navbar-start">
                        <div className="navbar-item is-size-1">
                            <CurrentDate/>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item is-size-1">
                            <CurrentTime/>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;