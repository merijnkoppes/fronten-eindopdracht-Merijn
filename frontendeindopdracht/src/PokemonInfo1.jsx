import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { Box , Button , Text} from 'grommet';

const PokemonInfo = () => {
  const [pokemon, setPokemon] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`https://pokeapi.co/api/v2/pokemon/${pokemon.id || 1}`);
      setPokemon(result.data);
    };

    fetchData();
  }, [pokemon.id]);

  const handleLoadRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    setPokemon({ id: randomId });
  };

  const handleSearchInputChange = async (event) => {
    setSearchTerm(event.target.value);

    if (event.target.value) {
      const result = await axios(`https://pokeapi.co/api/v2/pokemon/?limit=1000`);
      const filteredResults = result.data.results.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase()));
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const result = await axios(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
    setPokemon(result.data);
    setSearchResults([]);
  };

  return (
    <Box       
    background="red"
    pad="medium"
    margin="medium"
    align="center"
    justify="center">
      <div>
    
      <Button label="Toon een random pokemon" margin="medium" warning onClick={handleLoadRandomPokemon} />
      </div>
      <div>
        <form onSubmit={handleSearchSubmit}>
          <input type="text" placeholder="Zoek een pokemon" value={searchTerm} onChange={handleSearchInputChange} />
          <button type="submit">Zoek</button>
        </form>
        {searchResults && searchResults.map(result => (
          <div key={result.name}>
            <button onClick={() => setPokemon({ id: result.url.split('/').slice(-2, -1)[0] })}>{result.name}</button>
          </div>
        ))}
      </div>
      <div>
        {pokemon.name && (
          <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
          </>
        )}
      </div>
      <Text color="red">Grommet is veel makkelijker dan tailwind</Text>
    </Box>
  );
};

export default PokemonInfo;
