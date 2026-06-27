import Image from "next/image";
import Link from "next/link";
import { Badge } from "../atoms/Badge";
import { formatPokemonName, formatPokemonNumber } from "../../lib/pokemon";
import { PokemonListItem } from "../../types/pokemon";

interface Props {
  pokemon: PokemonListItem;
}

export function PokemonCard({ pokemon }: Props) {
  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/95 p-4 text-slate-900 shadow-[0_12px_40px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.28)]"
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_rgba(16,185,129,0.08)_45%,_rgba(255,255,255,0.95)_100%)] p-4">
        <Badge tone="dark" className="absolute right-3 top-3 tracking-[0.2em]">
          {formatPokemonNumber(pokemon.id)}
        </Badge>

        <Image
          src={pokemon.imageUrl}
          alt={formatPokemonName(pokemon.name)}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 20vw"
          className="object-contain p-3 transition duration-300 group-hover:scale-105"
          priority={pokemon.id <= 9}
        />
      </div>

      <Badge tone="sky" className="text-[0.65rem] uppercase tracking-[0.28em]">
        PokeAPI
      </Badge>

      <h2 className="mt-2 text-2xl font-black capitalize text-slate-950">
        {formatPokemonName(pokemon.name)}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        Abre el detalle para ver estadísticas, tipos y habilidades del Pokémon.
      </p>
    </Link>
  );
}