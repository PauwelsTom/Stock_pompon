import { parfums, parfumsInit } from "../data";
import "./Parfum.css"
import { Component } from "react";

// parfum, parfumValue, changeParfum, modeEdit
export class Parfum extends Component {
    
    constructor(props) {
        super();
        this.state = {
            disabled: false,
        }
        this.parfum = props.parfum;
    }

    getClassName = (type) => {
        if (this.state.disabled) {
            return type + " Disabled"
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
            return type;
        }
    }

    get_value = () => {
        if (this.props.modeEdit) {
            const text = parfums[this.props.parfum] + "/" + parfumsInit[this.props.parfum];
            return text;
        } else {
            return this.props.parfumValue[this.props.parfum];
        }
    }
    

    handleClick = (add) => {
        this.props.changeParfum(this.props.parfum, add);
        this.forceUpdate();
    }

    render() {
        return (
            <div className={this.getClassName("ParfumDiv")}>
                <div className={this.getClassName("BoutonPlusMoins")}  
                    onClick={() => this.handleClick(false)}>-</div>

                <div className="ParfumTextDiv">
                    <div className="ParfumText">{this.props.parfum}</div>
                    <div className="ParfumValue">{this.get_value()}</div>
                </div>

                <div className={this.getClassName("BoutonPlusMoins")} 
                    onClick={() => this.handleClick(true)}>+</div>
            </div>
        );
    }
}