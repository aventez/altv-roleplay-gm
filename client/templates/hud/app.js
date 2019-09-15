const { createElement, render, Component } = preact;
const h = createElement;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			money: 0
		};
	}

    componentDidMount() {
        if('alt' in window) {
            alt.on('hud:SetMoney', cash => {
                this.setState({ money: cash });
            });

            alt.on('hud:SetName', msg => {
                this.setState({ name: msg });
            });
        }
    }

	render()
	{
		return h('div', 
			{
				class: 'wrapper opacity'
			}, 
			h('span', 
			{
				style: 'position: absolute; margin-top: 3px',
				class: 'opacity'
			}, this.state.name),
			h('span', 
			{
				style: 'position: absolute; margin-top: -2px; right: 35px; font-size: 27px',
				class: 'opacity'
			}, '$'+this.state.money)
		);
	}
}

function ready() {
	render(h(App), document.querySelector('#render'));
}