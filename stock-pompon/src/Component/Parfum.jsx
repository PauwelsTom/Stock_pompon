import { parfums, parfumsInit } from "../data";
import "./Parfum.css"
import { Component } from "react";

// parfum, parfumValue, changeParfum, modeEdit
export class Parfum extends Component {
    
    constructor(props) {
        super();
        this.state = {
            disabled: parfums[props.parfum] === 0,
        }
        this.parfum = props.parfum;
    }

    getClassName = (type) => {
        if (this.state.disabled) {
            return type + " " + type + "Disabled";
        }
        if (this.props.modeEdit) {
            if (parfums[this.parfum] === parfumsInit[this.parfum]) {
                return type + " " + type + "ModeSpecialEgal";
            } else if (parfums[this.parfum] >= parfumsInit[this.parfum]) {
                return type + " " + type + "ModeSpecialPlus";
            } else {
                return type + " " + type + "ModeSpecialMoins";
            }
        } else {
            if (this.props.parfumValue[this.props.parfum] > parfums[this.parfum]) {
                return type + " " + type + "ModeSpecialPlus";
            }
            return type;
        }
    }

    get_value = () => {
        if (this.props.modeEdit) {
            const text = parfums[this.props.parfum] + "/" + parfumsInit[this.props.parfum];
            if (parfums[this.props.parfum] === 0 && !this.state.disabled) {
                this.setState({ disabled: true });
            } else if (parfums[this.props.parfum] > 0 && this.state.disabled) {
                this.setState({ disabled: false });
            }
            return text;
        } else {
            return this.props.parfumValue[this.props.parfum];
        }
    }
    

    handleClick = (add) => {
        if (this.state.disabled) {
            if (this.props.modeEdit && add) {
                this.props.changeParfum(this.props.parfum, add);
            }
        } else {
            this.props.changeParfum(this.props.parfum, add);
            this.forceUpdate();
        }
    }

    get_totalBacClass = () => {
        return (this.props.modeEdit? "Cache": "TotalBacs");
    }

    render() {
        return (
            <div className={this.getClassName("ParfumDiv")}>
                <div className={this.getClassName("BoutonPlusMoins")}  
                    onClick={() => this.handleClick(false)}>-</div>

                <div className="ParfumTextDiv">
                    <div className="ParfumText">{this.props.parfum}</div>
                    <div className="nombreGlace">
                        <div className="ParfumValue">{this.get_value()}</div>
                        <div className={this.get_totalBacClass()}>{"/" + parfums[this.props.parfum]}</div>
                    </div>
                </div>

                <div className={this.getClassName("BoutonPlusMoins")} 
                    onClick={() => this.handleClick(true)}>+</div>
            </div>
        );
    }
}