import "./Parfum.css"
import { Component } from "react";

// parfum, parfumValue, changeParfum
export class Parfum extends Component {
    
    constructor(props) {
        super();
        this.state = {
        }
    }

    handleClick = (add) => {
        this.props.changeParfum(this.props.parfum, add);
        this.forceUpdate();
    }

    render() {
        return (
            <div className="ParfumDiv">
                <div className="BoutonPlusMoins" 
                    onClick={() => this.handleClick(false)}>-</div>
                <div className="ParfumTextDiv">
                    <div className="ParfumText">{this.props.parfum}</div>
                    <div className="ParfumValue">{this.props.parfumValue[this.props.parfum]}</div>
                </div>
                <div className="BoutonPlusMoins" 
                    onClick={() => this.handleClick(true)}>+</div>
            </div>
        );
    }
}