import React from "react";
import "../App.css";

const PokemonList = (props) => {
  const { pokemon } = props;
  return (
    <div className="info-container">
      {pokemon.name} 
      <img className="info-image" src={pokemon.sprites.front_default} alt="Pokemon" />
    </div>
  );
};

export default PokemonList;
