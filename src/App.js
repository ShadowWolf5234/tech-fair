import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class App extends Component {
    constructor(props) {
        super(props);
    }

    onSave() {
        console.log('asdf');
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
                        prompt nmhvnhg adsf adsf dffdsmfsdamfsdmsdfamsdfamsdfmsadfmsdfamsdfamsadfmmnfdsa sdfa as fd sadf
                    </section>
                    <section>
                        <MyEditor/>
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
    constructor(props) {
        super(props);

        this.state = {text: ""};
    }

    render() {
        return (
            <ReactQuill
                value={this.state.text}
                onChange={this.handleChange}/>
        );
    }
}

const styles = {
    editor: {
        border: '1px solid gray',
        minHeight: '6em'
    }
};


export default App;
