import React, { Component } from "react";
import axios from "axios";

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.location.state,
            answers: [],
            result: ""
        }

    }

    componentDidMount() {
        console.log(this.props.location.state.incorrect)
        const answers_temp = this.props.location.state.incorrect.split(",");
        console.log(answers_temp)
        var correcta = this.props.location.state.correct;
        var position = Math.floor(
            Math.random() * answers_temp.length
        );
        answers_temp.splice(position, 0, correcta)
        this.setState({
            answers: answers_temp
        });
        console.log(answers_temp)
    }


    render() {
        const result = this.state.result
        let banner
        if (this.state.result == "right")
            banner = <p className="right"> CORRECT! </p>
        else if (this.state.result == "wrong")
            banner = <p className="wrong"> WRONG! </p>
        return (
            <div className="multipleChoice">
                <h1>{this.htmlDecode(this.props.location.state.title)}</h1>
                <div>
                    <div>
                        {this.state.answers.map(user => (
                            <li onClick={(a) => this.checkAnswer(a)}>{user}</li>
                        ))}
                    </div>
                    <p>
                        {this.props.location.state.category}
                    </p>

                    <p>
                        <b>Difficulty: </b>
                        {this.props.location.state.difficulty}
                    </p>
                </div>
                {banner}
            </div>
        );
    }


    htmlDecode(input) {
        var e = document.createElement("div");
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

    checkAnswer(ans) {
        if (this.state.result == "") {
            if (ans == this.props.location.state.correct) {
                this.setState({ result: "right" })
            }
            else this.setState({ result: "wrong" })
        }
    }
}

export default Question;