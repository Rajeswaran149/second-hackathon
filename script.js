let h1 = document.createElement("h1");
h1.innerText = "POKEMON API"
document.body.appendChild(h1)

let containerdiv = document.createElement("div");
containerdiv.classList.add("poke-container");
containerdiv.setAttribute("id", "poke_container");
document.body.appendChild(containerdiv);

var pokemons_number = 150;
var pokemons_start = 1;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {

		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	try {
		const res = await fetch(url);
		const pokemon = await res.json();
		createPokemonCard(pokemon);
	} catch (error) {
		console.log(error);
	}


};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];

	pokemonEl.style.backgroundColor = color;

	const pokeInnerHTML = `    
		<div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id
		}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
			.toString()
			.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Weight: <span>${pokemon.weight}</span></small><br>
			<small class="type">Ability: <span>${pokemon.abilities.map(e => e.ability.name)}</span></small><br>
			<small class="type">Moves: <span>${pokemon.moves[0].move.name},${pokemon.moves[1].move.name}</span></small>
        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);
}

fetchPokemons();




