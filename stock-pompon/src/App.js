import "./couleurs.css"
import './App.css';
import { Component } from 'react';
import { Parfum } from './Component/Parfum';
import { iconeCorbeille, iconeEchange, iconeEngrenage, iconeRaz, parfums, parfumsInit } from './data';
import { ZoneTexte } from './Component/ZoneTexte';

export default class App extends Component {

  constructor(props) {
    super();
    this.state = {
      values: {},
      modeEdit: false,
      tri: true,
    }
    
    this.addValue = this.addValue.bind(this);
  }

  componentDidMount() {
    const storedValues = JSON.parse(localStorage.getItem('parfumValues'));
    if (Object.keys(storedValues).length === Object.keys(parfums).length) {
      this.setState({ values: storedValues });
    } else {
      let values = {};
      for (const parf of Object.keys(parfumsInit)) {
        values[parf] = 0;
      }
      this.setState({ values: values });
      localStorage.setItem("parfumValues", JSON.stringify(values));
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
      return "Commande: " + total + " bacs";
    }
  }

  get_place = () => {
    let total = 0;
    for (const parf of Object.keys(parfums)) {
      if (this.state.values[parf] > parfums[parf]) {
        total += (parfumsInit[parf] - this.state.values[parf]);
      } else {
        total += parfumsInit[parf] - parfums[parf];
      }
    }
    return total;
  }

  get_placeRestante = (className=false) => {
    const total = this.get_place();
    if (className) {
      if (total < 0) {
        return "placeRouge";
      } else if (total > 0) {
        return "placeVert";
      }
    } else {
      if (total < 0) {
        return "Place manquante: " + -total + " bacs";
      } else if (total > 0) {
        return "Place restante: " + total + " bacs";
      }
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
    if (this.state.modeEdit) {
      for (const parf of Object.keys(parfums)) {
        parfums[parf] = parfumsInit[parf];
      }
      localStorage.setItem("parfums", JSON.stringify(parfums));
      this.forceUpdate();
      return;
    } else {
      let values = {};
      for (const parf of Object.keys(parfums)) {
        values[parf] = 0;
      }
      this.setState({ values: values });
      localStorage.setItem('parfumValues', JSON.stringify(values));
    }
  }

  changeMode = () => {
    this.setState({ modeEdit: !this.state.modeEdit });
  }

  get_parfums = () => {
    if (this.state.tri) {
      return Object.keys(parfums).sort((a, b) => a.localeCompare(b));
    } else {
      return Object.keys(parfums);
    }
  }

  changeOrdre = () => {
    this.setState({ tri: !this.state.tri });
  }

  render() {
    return (
      <div className={"App " + (this.state.modeEdit ? "AppSpecial": "AppNormal")}>
        <div className="titre">{this.get_title()}</div>
        <div className={"place " + this.get_placeRestante(true)}>{this.get_placeRestante()}</div>
        
        <div className="BoutonsHaut">

          <div className="ChangeMode" onClick={this.changeMode}>
            <img src={iconeEngrenage} alt="ChangeMode" className='ChangeModeImage'/>
          </div>

          <div className='ResetButton' onClick={this.resetValues}>
            <img src={this.state.modeEdit ? iconeRaz : iconeCorbeille} alt="Corbeille" className='CorbeilleImage'/>
          </div>

          <div className='OrdreBouton' onClick={this.changeOrdre}>
            <img src={iconeEchange} alt="Ordre" className='OrdreImage'/>
          </div>
        </div>

        {this.get_parfums().map((parf) => (
          <Parfum key={parf} parfum={parf} parfumValue={this.state.values} changeParfum={this.addValue} modeEdit={this.state.modeEdit}/>
        ))}

        <ZoneTexte values={this.state.values} get_place={this.get_place}/>
      </div>
    );
  }

}
