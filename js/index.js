const getPokemon = async (url) => {
  let arrayPokemon = [];
  let res = await fetch(url);
  let json = await res.json();
  //console.log(json)

  json.results.forEach(async (pokemon) => {
    let res = await fetch(pokemon.url);
    let json = await res.json();
    const dataPokemon = {
      id: json.id,
      name: json.name,
      tipo: json.types,
      avatar: json.sprites.other.dream_world.front_default,
    };
    arrayPokemon.push(dataPokemon);
    listarPokemon(arrayPokemon);
  });
  console.log(arrayPokemon);
};

function listarPokemon(arrayPokemon) {
  var card = "";
  arrayPokemon.map((pokemon) => {
    card += `<div class="col-lg-2 text-center mb-2">
                    <div class="card grid-container" style ="position: relative">
                        <img src="${pokemon.avatar}" class="w-100"/>
                        <div class ="card-body">
                            <h2>${pokemon.name}</h2>
                            <p>Tipo: ${pokemon.tipo.map(
                              (t) => `<span>${t.type.name}</span>`
                            )}</p>
                            <p><button class="btn btn-secondary" onclick="verDetalle(${
                              pokemon.id
                            })">Ver Mas&raquo;</button></p>
                        </div>
                    </div>
                </div>`;
  });
  // $('#listaPokemoncard').html(card)
  let divCard = document.getElementById("listaPokemoncard");
  divCard.innerHTML = card;
}

const verDetalle = (id) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(function (response) {
    response.json().then(function (pokemon) {
      altura = pokemon.height;
      peso = pokemon.weight;
      attack = pokemon.moves.map(
        (mv) => `<span class="badge bg-success">${mv.move.name} </span>`
      );
      nombre = pokemon.name;

      var exampleModal = new bootstrap.Modal(
        document.getElementById("staticBackdrop"),
        {
          keyboard: false,
        }
      );
      //var exampleModal = document.getElementById("staticBackdrop");
      var modalTitle = document.querySelector(".modal-title");
      modalTitle.innerHTML = nombre;

      document.getElementById("altura").innerHTML = altura;
      document.getElementById("peso").innerHTML = peso;
      document.getElementById("attack").innerHTML = attack;
      exampleModal.show();
    });
    // console.log(pokemon)
  });
};

function searchPokemon() {

  let name = document.getElementById("searchPokemonId").value;
  if(name){
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(function (response) {
    response.json().then(function (pokemon) {
      console.log(pokemon);
    
       let card = `<div class="col-lg-3 text-center mb-2">
                    <div class="card grid-container" style ="position: relative">
                        <img src="${pokemon.sprites.other.dream_world.front_default}" class="w-100"/>
                        <div class ="card-body">
                            <h2>${pokemon.name}</h2>
                            <p>Tipo: ${pokemon.types.map(
                              (t) => `<span>${t.type.name}</span>`
                            )}</p>
                            <p><button class="btn btn-secondary" onclick="verDetalle(${
                              pokemon.id
                            })">Ver Mas&raquo;</button></p>
                        </div>
                    </div>
                </div>`;

      // $('#listaPokemoncard').html(card)
      let divCard = document.getElementById("listaPokemoncard");
      divCard.innerHTML = card;
    });
  });
}else{
    getPokemon("https://pokeapi.co/api/v2/pokemon/?offset=150&limit=150");
}
}

getPokemon("https://pokeapi.co/api/v2/pokemon/?offset=150&limit=150");
