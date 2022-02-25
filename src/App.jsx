import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import PokemonList from "./Components/PokemonList";

function App() {
  // const allPokemons = [
  //   {
  //     "id": 1,
  //     "name": "Pikachu",
  //     "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
  //   }
  // ]
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("");

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      setNextUrl(res.data.next);
      await Promise.all(
        res.data.results.map(async (pokemon) => {
          let pokeResponse = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          setPokemons((p) => [...p, pokeResponse.data]);
        })
      );
    };
    getPokemon();
  }, []);

  //Load more pokemon
  const LoadPokemon = async () => {
    const res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    await Promise.all(
      res.data.results.map(async (pokemon) => {
        let pokeResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemons((p) => [...p, pokeResponse.data]);
      })
    );
  };
  return (
    <div className="App">
      <header> My Pokemons </header>
      <div className="pokemon-container">
        {pokemons.map((pokemon) => {
          return (
            <div className="pokemon">
              <PokemonList pokemon={pokemon} />
            </div>
          );
        })}
        <div className="btn" onClick={LoadPokemon}>
          <button>Load more</button>
        </div>
      </div>
    </div>
  );
}

export default App;
