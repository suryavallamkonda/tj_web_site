window.onload = function () {
  const numPokemon = 20;
  const container = document.getElementById("pokemon-container");

  for (let i = 1; i <= numPokemon; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then((response) => response.json())
      .then((pokemon) => {
        const pokemonElement = document.createElement("div");

        const nameElement = document.createElement("h1");
        nameElement.textContent = pokemon.name;
        pokemonElement.appendChild(nameElement);

        const imageElement = document.createElement("img");
        imageElement.src = pokemon.sprites.front_default;
        imageElement.alt = pokemon.name;
        pokemonElement.appendChild(imageElement);

        const heightElement = document.createElement("h2");
        heightElement.textContent = `Height: ${pokemon.height}`;
        pokemonElement.appendChild(heightElement);

        const weightElement = document.createElement("h2");
        weightElement.textContent = `Weight: ${pokemon.weight}`;
        pokemonElement.appendChild(weightElement);

        const typesElement = document.createElement("p");
        typesElement.textContent = `Types: ${pokemon.types
          .map((type) => type.type.name)
          .join(", ")}`;
        pokemonElement.appendChild(typesElement);

        container.appendChild(pokemonElement);
      })
      .catch((error) => console.error("Error:", error));
  }
};
