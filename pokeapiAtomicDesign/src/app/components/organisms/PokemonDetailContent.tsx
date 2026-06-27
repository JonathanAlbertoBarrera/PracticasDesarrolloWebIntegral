import Image from "next/image";
import { Badge } from "../atoms/Badge";
import { PokemonAbilityList } from "../molecules/PokemonAbilityList";
import { PokemonMetricGrid } from "../molecules/PokemonMetricGrid";
import { PokemonStatList } from "../molecules/PokemonStatList";
import { PokemonTypeList } from "../molecules/PokemonTypeList";
import { formatPokemonName, formatPokemonNumber } from "../../lib/pokemon";
import { PokemonDetail } from "../../types/pokemon";

interface Props {
  pokemon: PokemonDetail;
}

function getArtworkUrl(pokemon: PokemonDetail): string {
  return (
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default ??
    ""
  );
}

function formatStatLabel(statName: string): string {
  return statName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function PokemonDetailContent({ pokemon }: Props) {
  const artworkUrl = getArtworkUrl(pokemon);

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/95 text-slate-900 shadow-[0_20px_80px_rgba(15,23,42,0.32)]">
      <div className="grid gap-0 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative flex min-h-[24rem] items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_rgba(255,255,255,1)_55%)] p-8">
          {artworkUrl ? (
            <Image
              src={artworkUrl}
              alt={formatPokemonName(pokemon.name)}
              width={480}
              height={480}
              priority
              className="h-auto w-full max-w-[28rem] object-contain drop-shadow-[0_18px_35px_rgba(15,23,42,0.25)]"
            />
          ) : null}

          <Badge tone="dark" className="absolute left-6 top-6 tracking-[0.22em]">
            {formatPokemonNumber(pokemon.id)}
          </Badge>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
            Detalle del Pokémon
          </p>

          <h1 className="mt-3 text-4xl font-black capitalize text-slate-950 sm:text-5xl">
            {formatPokemonName(pokemon.name)}
          </h1>

          <div className="mt-5">
            <PokemonTypeList types={pokemon.types.map((slot) => slot.type.name)} />
          </div>

          <PokemonMetricGrid
            metrics={[
              {
                label: "Altura",
                value: `${(pokemon.height / 10).toFixed(1)} m`,
              },
              {
                label: "Peso",
                value: `${(pokemon.weight / 10).toFixed(1)} kg`,
              },
              {
                label: "Experiencia base",
                value: pokemon.base_experience?.toString() ?? "N/D",
              },
            ]}
          />

          <div className="mt-6">
            <h2 className="text-xl font-bold text-slate-950">Habilidades</h2>
            <PokemonAbilityList
              abilities={pokemon.abilities.map((slot) => ({
                name: slot.ability.name,
                isHidden: slot.is_hidden,
              }))}
            />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-950">Estadísticas</h2>
            <PokemonStatList
              stats={pokemon.stats.map((stat) => ({
                label: formatStatLabel(stat.stat.name),
                value: stat.base_stat,
              }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}