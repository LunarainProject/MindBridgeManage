import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './Chart.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  render() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          This is chart.js component
        </div>
        <Chart width={`${this.state.width / 2}px`} 
               height={`${this.state.height / 2}px`}> 
        </Chart>
      </header>
    </div>
  );
  }
}

export default App;
