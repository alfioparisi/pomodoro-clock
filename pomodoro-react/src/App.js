import React from 'react';
import classNames from 'classnames';
import './App.css';

function Header(props) {
  return (
    <header className="main-header" >
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
        <hr />
        <label>Short break </label>
        <input type="number" step="1" placeholder="5"
         onChange={(evt, time) => props.changeTime(evt, 'shortBreak')}
         disabled={props.isRunning ? true : false} />
        <hr />
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
      <div className={props.checkmarkClass}>{props.timer}</div>
      <div className="msg">{props.msg}</div>
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
      time: 25 * 60,
      shortBreak: 5 * 60,
      longBreak: 15 * 60,
      isRunning: false,
      isBreak: false,
      checkmarks: 0
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
      time: 25 * 60,
      shortBreak: 5 * 60,
      longBreak: 15 * 60,
      isRunning: false,
      isBreak: false,
      checkmarks: 0
    });
  }
  /** Change the state of the timer based on the user input.
  * @param {object} : the event information object
  * @param {string} : either 'time', 'shortBreak' or 'longBreak'
  */
  changeTime(evt, val) {
    // Save the time given by the user because we'll need it later.
    if (val === 'time') this.userTime = evt.target.value * 60 || 25 * 60;
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
    // If the timer is not running, start it and set a watcher on it.
    if (!this.state.isRunning) {
      this.int = setInterval(() => {
        this.setState({
          time: this.state.time - 1
        });
        this.watchTimer();
      }, 1000);
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
  /** Check the state of the timer every second.
  */
  watchTimer() {
    // If the time gets to 0 and we aren't in a break, set a break.
    if (this.state.time === 0) {
      if (!this.state.isBreak) {
        switch (this.state.checkmarks) {
          case 0 :
            this.setState({
              time: this.state.shortBreak,
              isBreak: true,
              checkmarks: 1
            });
            break;
          case 1 :
            this.setState({
              time: this.state.shortBreak,
              isBreak: true,
              checkmarks: 2
            });
            break;
          case 2 :
            this.setState({
              time: this.state.shortBreak,
              isBreak: true,
              checkmarks: 3
            });
            break;
          case 3 :
            this.setState({
              time: this.state.shortBreak,
              isBreak: true,
              checkmarks: 4
            });
            break;
          case 4 :
            this.setState({
              time: this.state.longBreak,
              isBreak: true,
              checkmarks: 0
            });
            break;
          default :
            return;
        } // switch
      } else {
        this.setState({
          time: this.userTime,
          isBreak: false
        });
      }
    } // time === 0 if
  }
  render() {
    const timer = `${Math.floor(this.state.time / 60)} : ${Math.floor(this.state.time % 60)}`;
    const msg = this.state.isRunning ? this.state.isBreak ? 'Break' : 'Work to do' : '';
    const checkmarkClass = classNames({
      'timer': true,
      'checkmark-1': this.state.checkmarks === 1,
      'checkmark-2': this.state.checkmarks === 2,
      'checkmark-3': this.state.checkmarks === 3,
      'checkmark-4': this.state.checkmarks === 4
    });
    return (
      <div className="container">
        <Header onSubmit={this.handleSubmit} isRunning={this.state.isRunning}
          time={this.state.time / 60} changeTime={(evt, val) => this.changeTime(evt, val)} />
        <Pomodoro timer={timer} isRunning={this.state.isRunning} msg={msg}
        checkmarkClass={checkmarkClass} />
        <Footer isRunning={this.state.isRunning} onClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
