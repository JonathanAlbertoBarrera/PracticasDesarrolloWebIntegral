import { PokemonGrid } from "./components/PokemonGrid";
import { getPokemonList } from "./lib/pokemon";

export default async function Home() {
  const pokemons = await getPokemonList();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_50%,_#020617_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <PokemonGrid pokemons={pokemons} />
      </div>
    </main>
  );
}
