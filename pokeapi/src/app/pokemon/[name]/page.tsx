import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPokemonName, formatPokemonNumber, getPokemon } from "../../lib/pokemon";

interface Props {
  params: Promise<{
    name: string;
  }>;
}

function getArtworkUrl(pokemon: Awaited<ReturnType<typeof getPokemon>>): string {
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

export default async function PokemonDetailPage({ params }: Readonly<Props>) {
  const { name } = await params;

  let pokemon: Awaited<ReturnType<typeof getPokemon>>;

  try {
    pokemon = await getPokemon(name);
  } catch {
    notFound();
  }

  const artworkUrl = getArtworkUrl(pokemon);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_35%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
        >
          <span aria-hidden>←</span> Volver al listado
        </Link>

        <section className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/95 text-slate-900 shadow-[0_20px_80px_rgba(15,23,42,0.32)]">
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

              <div className="absolute left-6 top-6 rounded-full bg-slate-950/90 px-4 py-2 text-sm font-semibold tracking-[0.22em] text-white">
                {formatPokemonNumber(pokemon.id)}
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
                Detalle del Pokémon
              </p>

              <h1 className="mt-3 text-4xl font-black capitalize text-slate-950 sm:text-5xl">
                {formatPokemonName(pokemon.name)}
              </h1>

              <div className="mt-5 flex flex-wrap gap-2">
                {pokemon.types.map((slot) => (
                  <span
                    key={slot.type.name}
                    className="rounded-full bg-slate-950 px-3 py-1 text-sm font-semibold capitalize text-white"
                  >
                    {slot.type.name}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-4 rounded-3xl bg-slate-50 p-5 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    Altura
                  </p>
                  <p className="mt-1 text-2xl font-bold text-slate-950">
                    {(pokemon.height / 10).toFixed(1)} m
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    Peso
                  </p>
                  <p className="mt-1 text-2xl font-bold text-slate-950">
                    {(pokemon.weight / 10).toFixed(1)} kg
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    Experiencia base
                  </p>
                  <p className="mt-1 text-2xl font-bold text-slate-950">
                    {pokemon.base_experience ?? "N/D"}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-bold text-slate-950">Habilidades</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {pokemon.abilities.map((slot) => (
                    <span
                      key={slot.ability.name}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm capitalize text-slate-700"
                    >
                      {slot.ability.name.replace(/-/g, " ")}
                      {slot.is_hidden ? " (oculta)" : ""}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-slate-950">Estadísticas</h2>
                <div className="mt-4 space-y-4">
                  {pokemon.stats.map((stat) => {
                    const percent = Math.min(100, Math.round((stat.base_stat / 255) * 100));

                    return (
                      <div key={stat.stat.name}>
                        <div className="mb-2 flex items-center justify-between gap-3 text-sm font-medium text-slate-700">
                          <span>{formatStatLabel(stat.stat.name)}</span>
                          <span>{stat.base_stat}</span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}