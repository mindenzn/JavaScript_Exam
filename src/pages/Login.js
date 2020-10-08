import Component from "../library/Component";
import h from "../library/hyperscript";
import {url} from "../Main";
import swal from "sweetalert";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [
                {   class: 'inputs',
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
                    class: 'login__button',
                    name: 'register',
                    type: 'submit',
                    title: 'Prisijungti'
                }
            ],
            credentials: {
                email: '',
                password: ''
            }
        }
    }

    login(e) {
        e.preventDefault();
        console.log(e);

        fetch(url +'/login', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(this.state.credentials)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(user => {
                if(user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.props.route('posts');
                }else{
                    swal('Deja', 'Blogai suvesti duomenys', 'error')
                }
            });
    }

    handleInput = (name, value) => {
        this.state.credentials[name] = value;
    }

    render() {
        const inputs = this.state.inputs.map(input => {
            return h('label', {class: 'login__label'}, input.labelText,
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
                    class: button.class,
                    name: button.name
                },
                button.title
            )
        });

        const icon = h('i', {class:"fas fa-comments-dollar login__comment-icon"});
        const question = h('h3', {}, 'Dar neturi prisijungimo?');
        const addUser = h('i', {
            class: "fas fa-user-plus login__register-icon",
            click: () => this.props.route('register')
        });
        const title = h('h1',{class:'main__title'},'SKELBIMŲ LENTA')
        const iconBox = h('div', {class: 'icon-box'}, addUser)
        const form = h('form', {
            class: 'login__form',
            submit: (e) => this.login(e)
        }, title,icon, ...inputs, ...buttons, question, iconBox);
        return h('div', {class: 'login'}, form);
    }
}