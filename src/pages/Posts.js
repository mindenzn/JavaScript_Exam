import Component from "../library/Component";
import h from "../library/hyperscript";
import {url} from "../Main";
import {user} from "../login";
import Navigation from "../components/Navigation";

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
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
            });

    }

    // createPosts(name, value) {
    //     this.state.posts[name] = value;
    // }

    render() {
        const allPosts = this.state.posts.map(post => {
            const title = h('h2', {class: 'hero__card-title'}, post.title);
            const text = h('p', {class: 'hero__card-text'}, post.body);
            const time = h('p', {class: 'hero__card-text'}, post.created_at.split('T')[0]);

            return h('div', {class: 'hero__card',}, title, text, time)
        });
        return h('section', {class: 'main__hero'}, ...allPosts);
    }
}

