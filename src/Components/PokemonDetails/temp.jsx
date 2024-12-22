{isLoading ? 'Loading...' :
    <>
        <img className="pokemon-details-img" src={pokemon.image} />
        <div className="pokemon-details-name">NAME : <span>{pokemon.name}</span> </div>
        <div className="pokemon-details-height">HEIGHT : {pokemon.height} </div>
        <div className="pokemon-details-weight">WEIGHT : {pokemon.weight} </div>
        <span>TYPES :</span>
        <div className="pokemon-details-types">
            {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>) }
        </div>
        {/* <div className="pokemon-details-moves">
            {pokemon.moves && pokemon.moves.map((m) => <div key={m}>{m}</div>) }
        </div> */}
    </>
}