import { notFound } from "next/navigation";
import { PokemonDetailTemplate } from "../../components/templates/PokemonDetailTemplate";
import { getPokemon } from "../../lib/pokemon";

interface Props {
  params: Promise<{
    name: string;
  }>;
}

export default async function PokemonDetailPage({ params }: Readonly<Props>) {
  const { name } = await params;

  let pokemon: Awaited<ReturnType<typeof getPokemon>>;

  try {
    pokemon = await getPokemon(name);
  } catch {
    notFound();
  }

  return <PokemonDetailTemplate pokemon={pokemon} />;
}