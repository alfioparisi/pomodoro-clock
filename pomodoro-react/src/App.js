import React from 'react';
import './App.css';

function Header(props) {
  return (
    <header>
      <h1>Pomodoro Clock</h1>
      <form onSubmit={props.onSubmit} >
        <label>Set your time : </label>
        <input type="number" step="1" placeholder="25"
          // If the timer is ON, dont't show any value in the input field.
          value={props.isRunning ? '' : props.time}
          // Pass in the callback both the event information object and which
          // among time, short break and long break has been changed.
          onChange={(evt, time) => props.changeTime(evt, 'time')}
          // If the timer is on, disable the input.
          disabled={props.isRunning ? true : false} />
        <label>Short break </label>
        <input type="number" step="1" placeholder="5"
         onChange={(evt, time) => props.changeTime(evt, 'shortBreak')}
         disabled={props.isRunning ? true : false} />
        <label>Long break </label>
        <input type="number" step="1" placeholder="15"
         onChange={(evt, time) => props.changeTime(evt, 'longBreak')}
         disabled={props.isRunning ? true : false} />
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
      <button onClick={props.onClick} >
        {props.isRunning ? 'Stop' : 'Start'}
      </button>
    </footer>
  );
}

// The state is in the App because every component will send inputs to update it.
class App extends React.Component {
  constructor() {
    // Get the context. It's required es6 syntax.
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
    this.handleClick= this.handleClick.bind(this);
  }
  /** Prevent the refresh of the page when the form is submitted and reset all
  the inputs to their default values. If the timer is running, stop it.
  * @param {object} : the event information object
  */
  handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.isRunning) clearInterval(this.int);
    this.setState({
      time: 25,
      shortBreak: 5,
      longBreak: 15,
      isRunning: false
    });
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
  /** Toggle the timer.
  */
  handleClick() {
    if (!this.state.isRunning) {
      this.int = setInterval(() => this.setState({
        time: this.state.time > 0 ? this.state.time - 1 : 0
      }), 1000);
      this.setState({
        isRunning: true
      });
    } else {
      clearInterval(this.int);
      this.setState({
        isRunning: false
      });
    }
  }
  render() {
    return (
      <div className="container">
        <Header onSubmit={this.handleSubmit} isRunning={this.state.isRunning}
          time={this.state.time} changeTime={(evt, val) => this.changeTime(evt, val)} />
        <Pomodoro time={this.state.time} />
        <Footer isRunning={this.state.isRunning} onClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
