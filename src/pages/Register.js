import Component from "../library/Component";
import h from "../library/hyperscript";
import {url} from "../Main";
import swal from "sweetalert";


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [
                {
                    class: 'inputs',
                    labelText: 'VARDAS',
                    placeholder: 'Vardas',
                    type: 'text',
                    name: 'name'
                },
                {
                    class: 'inputs',
                    labelText: 'PAVARDĖ',
                    placeholder: 'Pavardė',
                    type: 'text',
                    name: 'surname'
                },
                {
                    class: 'inputs',
                    labelText: 'EL. PAŠTAS',
                    placeholder: 'pavyzdys@email.com',
                    type: 'email',
                    name: 'email',
                },
                {
                    class: 'inputs',
                    labelText: 'SLAPTAŽODIS',
                    placeholder: 'Slaptažodis',
                    type: 'password',
                    name: 'password',
                }
            ],
            buttons: [
                {
                    class: 'register__button',
                    name: 'register',
                    type: 'submit',
                    title: 'Registruotis'
                }
            ],
            credentials: {}
        }
    }

    handleInput = (name, value) => {
        this.state.credentials[name] = value;
    }

    register(e) {
        e.preventDefault();

        fetch(url +'/register', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(this.state.credentials)
        })
            .then(response => response.json())
            .then(data => {
                if (data === 'success') {
                    this.props.route('login');
                    swal('Sveikinimai','Jūs sėkmingai prisiregistravote galite prisijungti','success')
                }else{
                    swal('Deja','Toks vartojas jau egziztuoja arba blogai įvesti duomenys','error')
                }
            });

    }

    render() {
        const inputs = this.state.inputs.map(input => {
            return h('label', {class: 'register__label'}, input.labelText,
                h(
                    'input',
                    {
                        keyup: e => this.handleInput(input.name, e.target.value),
                        placeholder: input.placeholder,
                        type: input.type,
                        class: input.class,
                        name: input.name
                    }
                ));
        });

        const buttons = this.state.buttons.map(button => {
            return h('button', {
                    type: button.type,
                    name: button.name,
                    class: button.class,
                },
                button.title
            )
        })
        const icon = h('i', {class: "fas fa-comments-dollar register__comment-icon"});
        const question = h('h3', {}, 'Užsiregistravęs?');
        const addUser = h('i', {
            class: "fas fa-user-check register__login-icon",
            click: () => this.props.route('login')});
        const iconBox = h('div', {class: 'icon-box'}, addUser)
        const form = h('form', {
            class: 'register__form',
            submit: (e) => this.register(e)}, icon, ...inputs, ...buttons, question, iconBox);
        return h('div', {class: 'register'}, form);
    }
}