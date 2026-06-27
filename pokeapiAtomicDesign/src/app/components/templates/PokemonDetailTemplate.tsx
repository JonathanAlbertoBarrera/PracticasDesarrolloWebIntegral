import Link from "next/link";
import { PokemonDetailContent } from "../organisms/PokemonDetailContent";
import { PokemonDetail } from "../../types/pokemon";

interface Props {
  pokemon: PokemonDetail;
}

export function PokemonDetailTemplate({ pokemon }: Props) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_35%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
        >
          <span aria-hidden>←</span> Volver al listado
        </Link>

        <div className="mt-6">
          <PokemonDetailContent pokemon={pokemon} />
        </div>
      </div>
    </main>
  );
}