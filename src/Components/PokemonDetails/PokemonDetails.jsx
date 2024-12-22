import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";

function PokemonDetails() {

    const {id} = useParams();
    const [pokemon, setPokemon] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    async function downloadPokemon() {
        setIsLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(response.data);
        setPokemon({
            name : response.data.name,
            image : response.data.sprites.other.dream_world.front_default,
            weight : response.data.weight,
            height : response.data.height,
            types : response.data.types.map((t) => t.type.name),
            moves : response.data.moves.map((m) => m.move.name)
        })
        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemon();        
    }, []);

    return (
        <div className="pokemon-details-wrapper">
            {isLoading ? 'Loading...' :
                <>
                    <img className="pokemon-details-img" src={pokemon.image} />
                    <div className="pokemon-details-name">NAME : <span>{pokemon.name}</span> </div>
                    <div className="pokemon-details-height">HEIGHT : {pokemon.height} </div>
                    <div className="pokemon-details-weight">WEIGHT : {pokemon.weight} </div>
                    <span className="type-span">TYPES :</span>
                    <div className="pokemon-details-types">
                        {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>) }
                    </div>
                    <div className="pokemon-details-moves">
                        {pokemon.moves && pokemon.moves.map((m) => <div key={m}>{m}</div>) }
                    </div>
                </>
            }
        </div>
    )
}

export default PokemonDetails;