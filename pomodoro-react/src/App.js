import React from 'react';
import './App.css';

function Header(props) {
  return (
    <header>
      <h1>Pomodoro Clock</h1>
      <form onSubmit={props.onSubmit} >
        <label>Set your time : </label>
        <input type="number" step="1" value={props.time}
          // Pass in the callback both the event information object and which
          // among time, short break and long break has been changed.
          onChange={(evt, time) => props.changeTime(evt, 'time')} />
        <input type="number" step="1" value={props.shortBreak}
         onChange={(evt, time) => props.changeTime(evt, 'shortBreak')} />
        <input type="number" step="1" value={props.longBreak}
         onChange={(evt, time) => props.changeTime(evt, 'longBreak')} />
        <button type="submit">Reset</button>
      </form>
    </header>
  );
}

function Pomodoro(props) {
  return (
    <section className="timer-container">
      <div className="timer">{props.time}</div>
    </section>
  );
}

function Footer(props) {
  return (
    <footer className="btn-container">
      <button>Start</button>
      <button>Stop</button>
    </footer>
  );
}

// The state is in the App because every component will send inputs to update it.
class App extends React.Component {
  constructor() {
    // Get the context. Is required es6 syntax.
    super();
    this.state = {
      time: 25,
      shortBreak: 5,
      longBreak: 15,
      isRunning: false,
      isBreak: false
    };
    // Bind the callbacks to not lose the context.
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeTime = this.changeTime.bind(this);
  }
  /** Prevent the refresh of the page when the form is submitted and reset all
  the inputs to their default values.
  * @param {object} : the event information object
  */
  handleSubmit(evt) {
    evt.preventDefault();
    this.setState({
      time: 25,
      shortBreak: 5,
      longBreak: 15
    });
    // TODO: clear interval
  }
  /** Change the state of the timer based on the user input.
  * @param {object} : the event information object
  * @param {string} : either 'time', 'shortBreak' or 'longBreak'
  */
  changeTime(evt, val) {
    this.setState({
      // If the time provided by the user is less than 0, set it to 0.
      // Use es6 syntax '[]' to compute the string 'val' to the property key of
      // 'this.state'.
      [val]: evt.target.value > 0 ? evt.target.value : ''
    });
  }
  render() {
    return (
      <div className="container">
        <Header onSubmit={this.handleSubmit} time={this.state.time}
          changeTime={(evt, val) => this.changeTime(evt, val)}
          shortBreak={this.state.shortBreak}
          longBreak={this.state.longBreak} />
        <Pomodoro time={this.state.time} />
        <Footer />
      </div>
    );
  }
}

export default App;
