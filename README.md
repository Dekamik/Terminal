This is a home terminal which shows date, time of day, weather for two locations, SL bus information for a selected bus stop and disruptions on specified lines and modes of transport.

## .env variables

### SL Platsuppslag
API for finding SL locations.
API key required: [SL Platsuppslag](https://www.trafiklab.se/api/sl-platsuppslag)

#### REACT_APP_SL_PLACES_API_KEY
Your API key.

#### REACT_APP_SL_PLACES_BUS_STOP_NAME
The name of the bus stop to lookup. Will select the first search result.

### SL Realtidsinformation 4
API for getting SL departures.
API key required: [SL Realtidsinformation 4](https://www.trafiklab.se/api/sl-realtidsinformation-4)

#### REACT_APP_SL_REALTIME_API_KEY
Your API key.

#### REACT_APP_SL_REALTIME_REFRESH_MILLIS
Refresh interval in whole milliseconds.

#### REACT_APP_SL_REALTIME_TIME_WINDOW_MINS
Max time window in whole minutes for planned departures.
Maximum 60 minutes allowed.

### SL Störningsinformation 2
API for getting SL deviations.
API key required: [SL Störningsinformation 2](https://www.trafiklab.se/api/sl-storningsinformation-2)

#### REACT_APP_SL_DEVIATIONS_API_KEY
Your API key.

#### REACT_APP_SL_DEVIATIONS_REFRESH_MILLIS
Refresh interval in whole milliseconds.

#### REACT_APP_SL_DEVIATIONS_LINES
Comma-seperated string of line-numbers to look-up.
Maximum 10 lines allowed.

#### REACT_APP_SL_DEVIATIONS_MODES
Comma-seperated string of modes of transportations to look-up.
Available modes: bus, metro, train, ship and tram.

### yr.no-forecast
API for fetching weather information from api.met.no.
No API key required.

#### REACT_APP_YR_REFRESH_MILLIS
Refresh interval in whole milliseconds.

#### REACT_APP_YR_LOC#_NAME
Display name of location.

#### REACT_APP_YR_LOC#_SYM
Font Awesome icon for location.

#### REACT_APP_YR_LOC#_LAT
The location's latitude.

#### REACT_APP_YR_LOC#_LON
The location's longitude.

#### REACT_APP_YR_LOC#_MSL
The location's height above sea-level in whole meters.

### Misc.

#### API_PORT
The port which the API dispatcher will run on.
