import { Component } from 'react';
import './App.css';
import { Parfum } from './Component/Parfum';
import { parfums } from './data';
import { ZoneTexte } from './Component/ZoneTexte';

export default class App extends Component {

  constructor(props) {
    super();
    this.state = {
      values: {},
    }
    
    this.addValue = this.addValue.bind(this);
  }

  componentDidMount() {
    const storedValues = localStorage.getItem('parfumValues');
    if (storedValues) {
      this.setState({ values: JSON.parse(storedValues) });
    } else {
      let values = {};
      for (const parf of Object.keys(parfums)) {
        values[parf] = 0;
      }
      this.setState({ values: values });
    }
  }

  addValue(parfum, add) {
    const tempValues = this.state.values;
    if (add) {
      tempValues[parfum] += 1;
      if (tempValues[parfum] > parfums[parfum]) {
        tempValues[parfum] = parfums[parfum];
      }
    } else {
      tempValues[parfum] -= 1;
      if (tempValues[parfum] < 0) {
        tempValues[parfum] = 0;
      }
    }
    this.setState({ values: tempValues });
    localStorage.setItem('parfumValues', JSON.stringify(tempValues));
  }

  resetValues = () => {
    let values = {};
    for (const parf of Object.keys(parfums)) {
      values[parf] = 0;
    }
    this.setState({ values: values });
    localStorage.setItem('parfumValues', JSON.stringify(values));
  }

  render() {
    return (
      <div className="App">
        <h1>Stocks Pompon</h1>

        <div className='ResetButton' onClick={this.resetValues}>
          <img src="corbeille.png"  className='CorbeilleImage'/>
        </div>

        {Object.keys(parfums)
        .sort((a, b) => a.localeCompare(b))
        .map((parf) => (
          <Parfum key={parf} parfum={parf} parfumValue={this.state.values} changeParfum={this.addValue}/>
        ))}

        <ZoneTexte values={this.state.values}/>
      </div>
    );
  }

}
