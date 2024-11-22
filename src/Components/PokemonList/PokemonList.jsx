import { useEffect, useState } from "react";
import axios from 'axios';
import './pokemonList.css' 
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    async function downloadPokemons() {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/') // this download list of 20 pokemons
        console.log(response.data);
        const pokemonResult = response.data.results; // we get the array of pokemons from result

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
    }, []);

    return (
        <div className="pokemon-list-wrapper">
            <div>Pokemon List</div>
            {isLoading ? 'Loading...' : 
                pokemonList.map((p) => {
                    return <Pokemon name={p.name} image={p.image} id={p.id} />
                })
            }
        </div>
    )

}

export default PokemonList;