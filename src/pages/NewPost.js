import Component from "../library/Component";
import h from "../library/hyperscript";
// import {user} from "../login";
import Navigation from "../components/Navigation";

export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [
                {
                    labelText: 'ANTRAŠTĖ',
                    placeholder: 'Ką parduodate arba ieškote',
                    name: 'title',
                    class: 'inputs'
                }
            ],
            textArea: [
                {
                    labelText: 'SKELBIMAS',
                    placeholder: 'Jūsų tekstas',
                    name: 'body'
                }

            ],
            buttons: [
                {
                    name: 'register',
                    type: 'submit',
                    title: 'Skelbti',
                    class: 'submit__button'
                }
            ],
            newPost: {
                title: '',
                body: ''
            }
        }
    }

    newPost(e) {
        e.preventDefault();
        fetch('http://rest.stecenka.lt/api/skelbimai', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': JSON.parse(localStorage.getItem('user')).token
            },
            method: 'POST',
            body: JSON.stringify(this.state.newPost)
        })
    }

    handleInput (name, value) {
        this.state.newPost[name] = value;
    }

    render() {
        const inputs = this.state.inputs.map(input => {
            return h('label', {}, input.labelText,
                h(
                    'input',
                    {
                        keyup: e => this.handleInput(input.name, e.target.value),
                        placeholder: input.placeholder,
                        name: input.name
                    }
                ));
        });
        const textArea = this.state.textArea.map(text => {
            return h('textarea', {
                name: text.name,
                placeholder: text.placeholder,
                keyup: e => this.handleInput(text.name, e.target.value),
            })
        })
        const buttons = this.state.buttons.map(button => {
            return h('button', {
                    type: button.type,
                    name: button.name
                },
                button.title
            )
        });

        const form = h('form', {submit: (e) => {this.newPost(e)}}, ...inputs, ...textArea, ...buttons);
        return h('div', {}, form);
    }
}