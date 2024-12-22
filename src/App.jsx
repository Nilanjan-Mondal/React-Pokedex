import { Link } from "react-router-dom"
import Pokedex from "./Components/Pokedex/Pokedex"
import PokemonList from "./Components/PokemonList/PokemonList"
import CustomRoutes from "./Routes/CustomRoutes"
import "./App.css"


function App() {

  return (
    <div className="outer-pokedex">
      <h1 id="pokedex-head">
        <Link to="/">POOKIEDEX</Link>
      </h1>
      <CustomRoutes />
    </div>
  )
}

export default App
