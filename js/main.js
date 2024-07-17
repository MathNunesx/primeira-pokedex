// VARIAVÉIS DOS ELEMENTOS DO HTML
const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_img')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const next = document.querySelector('.btn-next')
const prev = document.querySelector('.btn-prev')

// VARIAVÉL PARA A BUSCA
let searchPokemon = 1;

// MÉTODO GLOBAL FETCH
const fetchPokemon = async (pokemon) => {

    // VARIAVÉL PARA GAURDAR A RESPOSTA DA API
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

// CONDIÇÃO PARA STATUS DA RESPOSTA SER VERDADEIRO
    if(APIResponse.status == 200){
    const data = await APIResponse.json();
    return data;
    }
}

// VARIAVEL PARA RENDENRIZAR OS DADOS DO POKEMON
const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);

    // CONDIÇÃO PARA CASO ENCONTRE OS DADOS DO POKE E CASO NÃO ENCONTRAR
    // CASO ENCONTRAR IRÁ SER EXIBIDO NO HTML
    if(data){
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    input.value='';
    searchPokemon = data.id;
    // CASO NÃO, ELEMENTOS SERÃO EXIBIDOS COMO NOT FOUND
    } else{
        pokemonImage.style.display ='none'
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
    }
}

// FUNCIONALIDADE DDE DIGITAR NO INPUT E RETORNAR OS DADOS
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());

})

// FUNCIONALIDADE DOS BOTTÕES PROXIMO E ANTERIOR
prev.addEventListener('click', () =>{
    if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
})

next.addEventListener('click', () =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon)
