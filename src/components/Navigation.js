import Component from "../library/Component";
import h from "../library/hyperscript";

export default class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const newPostIcon = h('i', {
            class:"fas fa-plus-square header__ul-icons",
            click: () => this.props.route('newPost')                                                            // cia click naujam postui
        }, h('p', {class: 'header__ul-text'}, 'Naujas įrašas'));

        const allPostsIcon = h('i', {
            class: "fas fa-clone header__ul-icons",
            click: () => {
                this.props.route('posts')
            }
        }, h('p', {class: 'header__ul-text'}, 'Visi įrašai'));

        const logOut= h('i',{
            class: "fas fa-sign-out-alt header__ul-icons",
                click: () => {
                    localStorage.removeItem('user');
                    this.props.route('login');
                    this.props.isLoggedIn(false);
                }
            }, h('p',{class:'header__ul-text'},'Atsijungti'));

        const ul = h('ul', {class: 'header__ul'},newPostIcon,allPostsIcon,logOut);

        const nav = h('nav', {
            class: 'header__nav',
            click: () => this.props.exit()
        }, ul);

        return  h('div', {class: 'main__header'}, nav);
    }
}