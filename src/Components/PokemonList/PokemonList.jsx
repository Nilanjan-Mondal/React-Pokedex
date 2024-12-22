import { useEffect, useState } from "react";
import axios from 'axios';
import './pokemonList.css' 
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pokedexURL, setPokedexURL] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [prevURL, setPrevURL] = useState('');
    const [nextURL, setNextURL] = useState('');
    
    async function downloadPokemons() {
        setIsLoading(true);
        const response = await axios.get(pokedexURL) // this download list of 20 pokemons
        console.log(response.data);
        const pokemonResult = response.data.results; // we get the array of pokemons from result

        setNextURL(response.data.next);
        setPrevURL(response.data.previous);
        const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url)) // iterating over the array of pokemons, and using their url to create an array of promises that will download those 20 pokemons

        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData);

        // now iterate ob the data of each pokemon, and extarct id, name , image, types
        const res = pokemonData.map((pokedata) => {
            const pokemon = pokedata.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default, 
                types: pokemon.types
            };
        });
        console.log(res);
        setPokemonList(res);


        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokedexURL]);

    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
                {isLoading ? 'Loading...' : 
                    pokemonList.map((p) => {
                        return <Pokemon name={p.name} image={p.image} id={p.id} />
                    })
                }
            </div>

            <div className="buttonClass">
                <button disabled={prevURL == null} onClick={() => setPokedexURL(prevURL)} > PREV </button>
                <button disabled={nextURL == null} onClick={() => setPokedexURL(nextURL)} > NEXT </button>
            </div>

        </div>
    )

}

export default PokemonList;