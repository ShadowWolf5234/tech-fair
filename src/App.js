import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: localStorage.getItem('text'),
      prompt: ""
    };
  }

  componentDidMount() {
    fetch('https://www.ineedaprompt.com/dictionary/default/prompt?q=adj+noun+adv+verb+noun+location')
    .then((response) => response.json())
    .then((prompt) => this.setState({text: this.state.text, prompt: prompt.english}));

  }

  onSave() {
    localStorage.setItem('text', this.state.text);
  }

  handleChange(newText) {
    this.setState({text: newText, prompt: this.state.prompt});
  }

  render() {
    return (
      <Container>
        <Row>
          <Col >
            My name is Dean and this is a writing prompts website.
            You might get some crazy and some lame or some mild.
          </Col>
        </Row>

        <Row>
          <Col>
            {this.state.prompt}
          </Col>
        </Row>

        <Row>
          <Col >
            <MyEditor
              width="100%"
              text={this.state.text}
              handleChange={(text) => this.handleChange(text)}/>
          </Col>
        </Row>

        <Row>
          <Col >
            <button onClick={() => this.onSave()}>Save</button>
          </Col>
        </Row>
      </Container>
    );
  }
}

class MyEditor extends Component {
  render() {
    return (
      <ReactQuill
        value={this.props.text}
        onChange={(text) => this.props.handleChange(text)}/>
    );
  }
}

export default App;
