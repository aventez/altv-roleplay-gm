const { createElement, render, Component } = preact;
const h = createElement;

let characters = Array();
let selected = undefined;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	characters: new Array(),
        	selectedButton: null,
            disabledForm: true
        };
    }

    componentDidMount() {
        if('alt' in window) {
            alt.on('choose:AddChar', this.addCharacter.bind(this));
        }
    }

    addCharacter(uid, name) {
    	characters = [...this.state.characters];

    	var character = { };

    	character.uid = uid;
    	character.name = name;

    	characters.push(character);

    	this.setState({ characters });
    }

	buttonSelected(e) {
        let selectedButton = e.target.id;
        this.setState({ selectedButton });

        let disabledForm = false;
        this.setState({ disabledForm });
	}

    submitClick() {
        if('alt' in window) {
            if(this.state.selectedButton !== undefined) {
                alt.emit('choose:PickCharacter', this.state.selectedButton);
            }
        }
    }

    render() {
    	return h(
    		'div', 
    		{
    			id: 'box',
    			class: 'box box-choose opacity'
    		}, h(
    			'center',
    			{}, h(
    				'img',
    				{
    					src: 'https://i.imgur.com/2cod08r.png',
    					id: 'logo',
    					class: 'logo-select',
    					alt: 'Honest Roleplay'
    				}
    			),
    			h(
    				'div',
    				{
    					id: 'characterChoose',
    					style: 'display: block'
    				}, h(
    					'h1'
    				, {}, 'Wybór postaci'),
    				h(Characters, {
    					state: this.state,
    					click: this.buttonSelected.bind(this)
    				}),
    				h(
    					'button',
    					{
    						id: 'button_choose',
    						class: 'button',
    						title: 'Wybierz postać',
                            disabled: this.state.disabledForm,
                            onclick: this.submitClick.bind(this)
    					}, 'Wybierz postać'
    				)
    			)
    		)
    	);
    }
}

const Characters = ({ state, click }) => {
	let charDivs = state.characters.map((id, key) => {
		return h(
			'button',
			{
				onmousedown: click.bind(this),
                id: characters[key].uid,
                class: '' + characters[key].uid === state.selectedButton ? 'choosebutton selected opacity' : 'choosebutton opacity',
			}, characters[key].name + ' (UID: '+characters[key].uid+')'
		);
	});

	return h('div', { class: 'characters' }, charDivs);
}

render(h(App), document.querySelector('#render'));

function ready() {
    if ('alt' in window) {
        alt.emit('choose:Ready');
    }
}