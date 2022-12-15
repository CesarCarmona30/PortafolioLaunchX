const pokeButton = document.getElementById('pokeButton');
const pokedexContent = document.getElementById('pokedexContent');
const containerContent = document.getElementById('containerContent');
const elementName = document.getElementById('namePokemon');
const pokeNameInput = document.getElementById('pokeName');
const pokePhoto = document.getElementById('pokeImg');
const elementTypes = document.getElementById('types');
const elementAbilities = document.getElementById('abilities');
const buttonContent = document.getElementById('pokeButtonCircle1')

elementTypes.classList.replace('types', 'notFoundTypes');
elementAbilities.classList.replace('abilities', 'notFoundAbilities');
let open = false;
console.log(open)

pokeButton.addEventListener('click', () => {
    if(!open){
        pokeButton.classList.replace('pokeButton', 'pokeButtonNext');
        pokedexContent.classList.replace('pokedexContent', 'pokedexContentOpen');
        setTimeout(()=>{
            containerContent.classList.replace('containerContent', 'containerContentNext');
        }, 2000)
        open = true;
    }else{
        setTimeout(()=>{
            pokeButton.classList.replace('pokeButtonNext', 'pokeButton');
            pokedexContent.classList.replace('pokedexContentOpen', 'pokedexContent');
        }, 3000)
        containerContent.classList.replace('containerContentNext', 'containerContent');
        open = false;
    }
});

console.log(open)
const fetchPokemon = () => {
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then(res => {
        if(res.status != '200'){
            console.log(res);
            pokeImage('https://media0.giphy.com/media/vyuY7VgIsdqaxY1U5J/giphy.gif?cid=ecf05e47ip2m7u7r3t38yx0uyrqhmctqda7uxf68lbglwbiq&rid=giphy.gif&ct=s');
            elementName.innerHTML = 'Not Found ):';
            elementTypes.classList.replace('types', 'notFoundTypes');
            elementAbilities.classList.replace('abilities', 'notFoundAbilities');
        }else{
            elementTypes.classList.replace('notFoundTypes', 'types');
            elementAbilities.classList.replace('notFoundAbilities', 'abilities');
            return res.json();
        }
    }).then(data => {
        if (data){
            console.log(data);
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            namePokemon(data);
            typesPokemon(data);
            abilitiesPokemon(data);
        }
    });
};

const pokeImage = url => {
    pokePhoto.src = url;
};


const namePokemon = item => {
    let name = item.name;
    const id = item.id;
    name = name.charAt(0).toUpperCase()  + name.slice(1);
    elementName.innerHTML = id + '.' + name;
}

const typesPokemon = item => {
    let namesTypes = item.types.map(nameTypes => nameTypes.type.name);
    namesTypes = namesTypes.join(', ');
    elementTypes.innerHTML = `<h5>Types</h5>\n<p>${namesTypes}</p>`;
    console.log(namesTypes);
}

const abilitiesPokemon = item => {
    let namesAbilities = item.abilities.map(nameAbilities => nameAbilities.ability.name);
    namesAbilities = namesAbilities.join(', ');
    elementAbilities.innerHTML = `<h5>Abilities</h5>\n<p>${namesAbilities}</p>`;
    console.log(namesAbilities);
}