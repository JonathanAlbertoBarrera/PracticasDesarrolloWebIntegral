import { HomeTemplate } from "./components/templates/HomeTemplate";
import { getPokemonList } from "./lib/pokemon";

export default async function Home() {
  const pokemons = await getPokemonList();

  return <HomeTemplate pokemons={pokemons} />;
}
