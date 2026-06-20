import { formatPokemonNumber } from "../lib/pokemon";
import { PokemonListItem } from "../types/pokemon";
import { PokemonCard } from "./PokemonCard";

interface Props {
  pokemons: PokemonListItem[];
}

export function PokemonGrid({ pokemons }: Props) {
  return (
    <section className="py-4 sm:py-8">
      <div className="mb-10 grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
        <div>
          <div className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
            PokeAPI Explorer
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-6xl">
            Listado general de Pokémon con su detalle completo
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Explora el catálogo cargado desde la PokeAPI y abre cada tarjeta para
            consultar su información principal, tipos, habilidades y estadísticas.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-100 shadow-2xl shadow-sky-950/20 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            Pokémon cargados
          </p>
          <div className="mt-3 text-4xl font-black text-white">
            {pokemons.length}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Cada tarjeta abre la ruta de detalle con la información del Pokémon
            seleccionado.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <p className="mt-8 text-sm text-slate-400">
        Mostrando {pokemons.length} Pokémon desde {formatPokemonNumber(1)}.
      </p>
    </section>
  );
}