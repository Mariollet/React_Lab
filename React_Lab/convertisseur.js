const scaleNames = {
  c: "Celcius",
  f: "Fahrenheit",
};

function BoilingVerdict({ celcius }) {
  if (celcius >= 100) {
    return <div className="alert alert-success my-4">L'eau bout</div>;
  }
  return <div className="alert alert-secondary my-4">L'eau ne bout pas</div>;
}

function toCelcius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}
function toFahrenheit(celcius) {
  return (celcius * 9) / 5 + 32;
}

function tryConvert(temp, convert) {
  const value = parseFloat(temp);
  if (Number.isNaN(value)) {
    return "";
  }
  return (Math.round(convert(value) * 100) / 100).toString();
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const name = "scale" + this.props.scale;
    const scaleName = scaleNames[this.props.scale];
    const { temperature } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="celsius">Température (en {scaleName}) </label>
        <input
          type="text"
          id={name}
          onChange={this.handleChange}
          value={temperature}
          className="form-control"
        />
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: "c",
      temperature: 20,
    };
    this.handleCelciusChange = this.handleCelciusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }

  handleCelciusChange(temperature) {
    this.setState({ scale: "c", temperature });
  }
  handleFahrenheitChange(temperature) {
    this.setState({ scale: "f", temperature });
  }

  render() {
    const { temperature, scale } = this.state;
    const celcius =
      scale === "c" ? temperature : tryConvert(temperature, toCelcius);
    const fahrenheit =
      scale === "f" ? temperature : tryConvert(temperature, toFahrenheit);
    return (
      <div className="card p-4 shadow-lg">
        <h1>Convertisseur C° / F°</h1>
        <hr />
        <TemperatureInput
          scale="c"
          temperature={celcius}
          onTemperatureChange={this.handleCelciusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celcius={parseFloat(celcius)} />
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.querySelector("#app"));
