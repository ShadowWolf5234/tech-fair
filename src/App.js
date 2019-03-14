import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//https://www.ineedaprompt.com/dictionary/default/prompt?q=adj+noun+adv+verb+noun+location

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {text: localStorage.getItem('text')};
    }

    onSave() {
        localStorage.setItem('text', this.state.text);
    }

    handleChange(newText) {
        this.setState({text: newText});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    My name is Dean and this is a witing prompts website. You might get some crazy and some lame or some
                    mild.
                </header>

                <section>
                    <section>
                        prompt nmhvnhg ads
                    </section>
                    <section>
                        <MyEditor text={this.state.text} handleChange={(text) => this.handleChange(text)}/>
                    </section>
                    <section>
                        <button onClick={() => this.onSave()}>Save</button>
                    </section>
                </section>
            </div>
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
