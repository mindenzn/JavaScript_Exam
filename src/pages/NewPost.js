import Component from "../library/Component";
import h from "../library/hyperscript";
import {url} from "../Main";


export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newInputs: [
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
                    name: 'body',
                    class: 'main__form-textarea'
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
        e.preventDefault()
        fetch(url +'/api/skelbimai', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': JSON.parse(localStorage.getItem('user')).token
            },
            method: 'POST',
            body: JSON.stringify(this.state.newPost)
        })
            .then( () =>{
                this.props.route('posts')
        })

    }

    handleInput (name, value) {
        this.state.newPost[name] = value;
    }

    render() {
        const newPostInput = this.state.newInputs.map(input => {
            return h('label', {class:'main__form-label'}, input.labelText,
                h(
                    'input',
                    {
                        keyup: e => this.handleInput(input.name, e.target.value),
                        placeholder: input.placeholder,
                        name: input.name,
                        class: input.class
                    }
                ));
        });
        const textArea = this.state.textArea.map(text => {
            return h('textarea', {
                name: text.name,
                placeholder: text.placeholder,
                class: text.class,
                keyup: e => this.handleInput(text.name, e.target.value),
            })
        })
        const buttons = this.state.buttons.map(button => {
            return h('button', {
                    type: button.type,
                    name: button.name,
                    class: button.class
                },
                button.title
            )
        });

        const form = h('form', {
            class:'main__form',
            submit: (e) => {this.newPost(e)}}, ...newPostInput, ...textArea, ...buttons);
        return h('div', {class: 'main__new-post'}, form);
    }
}