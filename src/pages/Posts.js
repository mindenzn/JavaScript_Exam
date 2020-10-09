import Component from "../library/Component";
import h from "../library/hyperscript";
import {url} from "../Main";
import Navigation from "../components/Navigation";

const user = JSON.parse(localStorage.getItem('user'))



export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            buttons: [
                {
                    name: 'delete',
                    type: 'submit',
                    title: 'Trinti skelbima',
                    class: 'delete__button'
                }
            ],
        }
        this.post()
    }

    post() {
        fetch(url + '/api/skelbimai', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': JSON.parse(localStorage.getItem('user')).token
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                this.setState({posts: data});
                console.log('hello')
            });
    }

    delPost(id) {
        fetch(url + `/api/skelbimai/${id}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': JSON.parse(localStorage.getItem('user')).token
            },
            method: 'DELETE',
        })
            .then(data => {
                const leftPosts = this.state.posts.filter(post => post.id !== id);
                this.setState({posts: leftPosts});
            })
    }

    render() {
        const allPosts = this.state.posts.map(post => {
            const title = h('h2', {class: 'hero__card-title'}, post.title);
            const text = h('p', {class: 'hero__card-text'}, post.body);
            const time = h('p', {class: 'hero__card-text'}, post.created_at.split('T')[0]);
            const userName = h('h3', {class: ' hero__card-name'}, user.name)
            const userSurname = h('h3', {class: ' hero__card-name'}, user.surname)
            const userBox = h('div', {class: 'hero__card-user'}, userName, userSurname)
            const del = post.user_id === JSON.parse(localStorage.getItem('user')).id ? h('button', {
                    class: 'delete__button',
                    click: (e) => this.delPost(post.id)
                },
                'Trinti skelbima') : ''

            return h('div', {class: 'hero__card', id: post.id}, title, userBox, text, time, del)
        });
        return h('section', {class: 'main__hero'}, ...allPosts);
    }
}

