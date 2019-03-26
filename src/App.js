import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

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
      <>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">
      {'Deans writing prompts'}
    </Navbar.Brand>

  </Navbar>
      <Container>

        <Row className="b">
          <Col>
            {this.state.prompt}
          </Col>
        </Row>

        <Row>
          <Col>
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
      </>
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
