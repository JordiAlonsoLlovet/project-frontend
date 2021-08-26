import React, { Component } from "react";
import axios from "axios";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Question from "./Question";

class ScrollComponent extends Component {
  constructor() {
    super();
    this.state = {
        trivia: [],
        answers: [],
      question: "",
      token: "",
      finish: false,
      loading: false
    };
  }

  render() {
    // Additional css
    const loadingCSS = {
      height: "100px",
      margin: "30px"
    };

    // To change the loading icon behavior
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

    return (
      <div>
        <Route
          path="/question"
          render={props => (
              <Question {...props} pregunta={this.state.question} respuestas={this.state.answers} />
          )}
        />
        <div className="loadedContainers">
          {this.state.trivia.map(user => (
            <NavLink
              to="/question"
              className="container"
              onClick={() => this.setQuestion(user)}
            >
                  <h2>{this.htmlDecode(user.question)}</h2>
                  <li>{this.htmlDecode(user.incorrect_answers[1])}</li>
              <div>
                <li>{user.category}</li>
                <li>
                  <b>Difficulty: </b>
                  {user.difficulty}
                </li>
              </div>
            </NavLink>
          ))}
        </div>
        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>Loading...</span>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getToken();

    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      this.getTrivia();
    }
    this.setState({ prevY: y });
  }

    setQuestion(pregunta) {
        console.log(pregunta);
        this.setState({ question: pregunta });
        var position = Math.floor(Math.random() * pregunta.incorrect_answers.length)
        var answers = pregunta.incorrect_answers.splice(position, 0, ...pregunta.correct_answer)
        this.setState({ answers: answers })
    }

  getTrivia(limit = 10) {
    //console.log(this.state.token)
    this.setState({ loading: true });
    axios
      .get(
        "https://opentdb.com/api.php?amount=" +
          limit +
          "&token=" +
          this.state.token
      )
      .then(res => {
        switch (res.data.response_code) {
          case 0:
            this.setState({
              trivia: [...this.state.trivia, ...res.data.results]
            });
            this.setState({ loading: false });
            break;
          case 1:
            if (limit <= 1) {
              this.setState({ finish: true });
              this.setState({ loading: false });
            } else this.getTrivia(limit - 1);
            break;
          default:
            this.getToken();
        }
      });
  }

  getToken() {
    axios.get("https://opentdb.com/api_token.php?command=request").then(res => {
      this.setState({ token: res.data.token });
      this.getTrivia();
    });
  }

  htmlDecode(input) {
    var e = document.createElement("div");
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }
}

export default ScrollComponent;
