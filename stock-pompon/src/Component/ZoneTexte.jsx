import { Component } from "react";
import "./ZoneTexte.css"
import { parfums } from "../data";

// values
export class ZoneTexte extends Component {
    constructor(props) {
        super();
    }

    // Copie le contenu de la zone de texte dans le presse-papier
    copyToClipboard = () => {
        const textToCopy = this.valuesToString(this.props.values);
        navigator.clipboard.writeText(textToCopy).then(
          () => {
            alert("Copie dans le presse-papier effectuée");
          },
          (err) => {
            alert("Erreur lors de la copie dans le presse-papier: ", err);
          }
        );
      };
    
    // Prends values en entree et en fait une string pour la zone de texte
    valuesToString = (values) => {
        let res = "";
        let total = 0;
        for (const parf of Object.keys(values)) {
            const val = parfums[parf] - values[parf];
            if (val === 0) { continue; }
            res += " - " + val + " " + parf + "\n";
            total += val;
        }
        res += "\n\nTotal: " + total;
        return res;
    }

    render() {
        return (
            <div className="ZoneTexteDiv">
                <textarea 
                    id="readOnlyText"
                    value={this.valuesToString(this.props.values)}
                    disabled 
                    className="ZoneText"
                />
                <div className="BoutonCopier" onClick={this.copyToClipboard}>
                    <img src="https://cdn-icons-png.flaticon.com/512/6611/6611457.png" alt="jsp" width="100%"/>
                </div>
            </div>
        );
    }
}