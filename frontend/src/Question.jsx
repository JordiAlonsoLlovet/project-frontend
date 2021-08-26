import React, { Component } from "react";
import axios from "axios";

class Question extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1>{this.htmlDecode(this.props.pregunta.question)}</h1>
                <div>
                    <li>{this.props.pregunta.incorrect_answers}</li>
                    <div>
                        {this.props.respuestas.map(user => (
                            <li>{user}</li>
                        ))};
                    </div>
                    <li>
                        {this.props.pregunta.category}
                    </li>

                    <li>
                        <b>Difficulty: </b>
                        {this.props.pregunta.difficulty}
                    </li>
                </div>
            </div>
        );
    }


    htmlDecode(input) {
        var e = document.createElement("div");
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

}

export default Question;