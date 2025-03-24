import "./couleurs.css"
import './App.css';
import { Component } from 'react';
import { Parfum } from './Component/Parfum';
import { iconeEngrenage, parfums } from './data';
import { ZoneTexte } from './Component/ZoneTexte';

export default class App extends Component {

  constructor(props) {
    super();
    this.state = {
      values: {},
      modeEdit: false,
    }
    
    this.addValue = this.addValue.bind(this);
  }

  componentDidMount() {
    const storedValues = localStorage.getItem('parfumValues');
    if (Object.keys(storedValues).length === Object.keys(parfums).length) {
      this.setState({ values: JSON.parse(storedValues) });
    } else {
      let values = {};
      for (const parf of Object.keys(parfums)) {
        values[parf] = 0;
      }
      this.setState({ values: values });
    }
  }

  get_title = () => {
    if (this.state.modeEdit) {
      let total = 0;
      for (const parf of Object.keys(parfums)) {
        total += parfums[parf];
      }
      return "Stock total: " + total + " bacs";
    } else {
      let total = 0;
      for (const parf of Object.keys(this.state.values)) {
        const res = parfums[parf] - this.state.values[parf]
        total += (res < 0? 0: res);
      }
      return "Taille commande: " + total + " bacs";
    }
  }

  addValue(parfum, add) {
    if (this.state.modeEdit) {
      parfums[parfum] += (add ? 1 : -1);
      if (parfums[parfum] < 0) {
        parfums[parfum] = 0;
      }
      localStorage.setItem("parfums", JSON.stringify(parfums));
      this.forceUpdate();
    } else {
      const tempValues = this.state.values;
      if (add) {
        tempValues[parfum] += 1;
        // DEPRECATED: Limite haute du stock
        // if (tempValues[parfum] > parfums[parfum]) {
        //   tempValues[parfum] = parfums[parfum];
        // }
      } else {
        tempValues[parfum] -= 1;
        if (tempValues[parfum] < 0) {
          tempValues[parfum] = 0;
        }
      }
      this.setState({ values: tempValues });
      localStorage.setItem('parfumValues', JSON.stringify(tempValues));
    }
  }

  resetValues = () => {
    let values = {};
    for (const parf of Object.keys(parfums)) {
      values[parf] = 0;
    }
    this.setState({ values: values });
    localStorage.setItem('parfumValues', JSON.stringify(values));
  }

  changeMode = () => {
    this.setState({ modeEdit: !this.state.modeEdit });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.get_title()}</h1>
        <div className="BoutonsHaut">

          <div className="ChangeMode" onClick={this.changeMode}>
            <img src={iconeEngrenage} alt="ChangeMode" className='ChangeModeImage'/>
          </div>

          <div className='ResetButton' onClick={this.resetValues}>
            <img src="corbeille.png" alt="Corbeille" className='CorbeilleImage'/>
          </div>
        </div>

        {Object.keys(parfums)
        .sort((a, b) => a.localeCompare(b))
        .map((parf) => (
          <Parfum key={parf} parfum={parf} parfumValue={this.state.values} changeParfum={this.addValue} modeEdit={this.state.modeEdit}/>
        ))}

        <ZoneTexte values={this.state.values}/>
      </div>
    );
  }

}
