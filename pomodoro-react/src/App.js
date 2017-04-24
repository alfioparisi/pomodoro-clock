import React from 'react';
import './App.css';

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>Pomodoro Clock</h1>
        <label>Set your time : </label><input type="number" />
        <button type="reset">Reset</button>
      </header>
    );
  }
}

class Pomodoro extends React.Component {
  render() {
    return (
      <section className="timer-container">
        <div className="timer">TIMER</div>
      </section>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <footer className="btn-container">
        <button>Start</button>
        <button>Stop</button>
      </footer>
    );
  }
}

// The state is in the App because every component will send inputs to update it.
class App extends React.Component {
  constructor() {
    // Get the context.
    super();
    this.state = {
      
    };
  }
  render() {
    return (
      <div className="container">
        <Header />
        <Pomodoro />
        <Footer />
      </div>
    );
  }
}

export default App;
