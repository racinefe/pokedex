const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokempon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.bnt-prev');
const buttonNext = document.querySelector('.bnt-next');

let searchPokemon= 1;



const fetchPokemon = async (pokemon)=>{
    
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIresponse.status ===200){
        const dados = await APIresponse.json();

         return dados;
    }

}

const renderPokemon = async (pokemon) =>{
    
    pokemonName.innerHTML = 'Procurando...';
    pokemonNumber.innerHTML = '';

    const dados = await fetchPokemon(pokemon);

    if(dados){
        pokemonName.innerHTML = dados.name;
        pokemonNumber.innerHTML = dados.id;
        pokemonImage.src = dados['sprites']['versions']['generation-v']['black-white']
        ['animated']['front_default'];

        input.value = '';
        searchPokemon = dados.id;
    }else {
        pokemonName.innerHTML = 'não Encontrado:c';
        pokemonNumber.innerHTML = '';
        pokemonImage.src =  "./img/aaa.png";
        input.value = '';
    }

    
}

form.addEventListener('submit', (event)=>{

    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

buttonPrev.addEventListener('click', ()=>{
    pokemonImage.src = "./img/aaa.png";
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
  
})
buttonNext.addEventListener('click', ()=>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  
})
renderPokemon(searchPokemon);
