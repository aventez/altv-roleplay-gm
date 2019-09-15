const { createElement, render, Component } = preact;
const h = createElement;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            register: 0,
            fadeOut: 0,
            error: '',
            username: '',
            password: '',
            valid: false,
            isWaiting: false
        };

        this.wrapper = preact.createRef();
        this.username = preact.createRef();
    }

    componentDidMount() {
        if('alt' in window) {
            alt.on('error', message => {
                this.setState({ error: message });
            });
        }
    }

    updateError(msg) {
        this.setState({ error: msg });
    }

    validData(e) {
        if(e.target.id === 'username') {
            this.setState({ username: e.target.value });
        }
        else if(e.target.id === 'password') {
            this.setState({ password: e.target.value });
        }
    }

    checkData() {
        this.setState({ isWaiting: true });

        if('alt' in window) {
            alt.emit('checkAccount', this.state.username, this.state.password);
        }
    }

    render() {
    	return h(
    		'div',
    		{
    			id: 'box',
    			class: 'box box-login opacity'
    		},
			h(
                'center', 
                { 
                    class: 'center' 
                }, 
                h(
                    'img',
                    {
                        src: 'https://i.imgur.com/2cod08r.png',
                        id: 'logo',
                        class: 'logo-select',
                        alt: 'Honest Roleplay'
                    },
                ),
                h(
                    'div',
                    {
                        id: 'characterLogin',
                        style: 'display: block'
                    },
                    h(
                        'h1',
                        {

                        }, "Nazwa użytkownika"
                    ),
                    h(
                        'input',
                        {
                            id: 'username',
                            class: 'input',
                            oninput: this.validData.bind(this),
                            type: 'text'
                        }
                    ),
                    h(
                        'h1',
                        {

                        }, "Hasło"
                    ),
                    h(
                        'input',
                        {
                            id: 'password',
                            class: 'input',
                            oninput: this.validData.bind(this),
                            type: 'password'
                        }
                    ),
                    h(
                        'button',
                        {
                            id: 'button_login',
                            class: 'button',
                            onclick: this.checkData.bind(this),
                            title: "Zaloguj się"
                        }, "Zaloguj się"
                    ),
                    h(
                        'div',
                        {
                            id: 'error',
                            class: 'error'
                        },
                        h(
                            'span',
                            {}, this.state.error
                        )
                    )
                )
            )
    	);
    }
}

render(h(App), document.querySelector('#render'));
