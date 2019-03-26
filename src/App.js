import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: localStorage.getItem('text') || '',
      prompt: localStorage.getItem('prompt') || ''
    };
  }

  componentDidMount() {
      if(this.state.prompt.length===0) {
        this.getNewPrompt();
      }
  }

  getNewPrompt() {
      fetch('https://www.ineedaprompt.com/dictionary/default/prompt?q=adj+noun+adv+verb+noun+location')
      .then((response) => response.json())
      .then((prompt) => {
        this.setState({text: this.state.text, prompt: prompt.english});
        localStorage.setItem('prompt', prompt.english);
      });
    }

  onSave() {
    localStorage.setItem('text', this.state.text);
  }

  onNewText() {
    localStorage.clear();
    this.setState({text: '', prompt: ''});
    this.getNewPrompt();
  }

  handleChange(newText) {
    this.setState({text: newText, prompt: this.state.prompt});
  }

  render() {
    let now = ((this.state.text.length)/500) * 100;
    return (
      <>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">
      Deans writing prompts
    </Navbar.Brand>
    <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <Button onClick={() => this.onNewText()}>New Text</Button>
      </Navbar.Collapse>
  </Navbar>
      <Container>

        <Row>
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
            <ProgressBar animated now={now} label={`${now}%`} />
          </Col>
        </Row>

        <Row>
          <Col >
            <Button onClick={() => this.onSave()}>Save</Button>
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
