import {
  PokemonDetail,
  PokemonListItem,
  PokemonListResponse,
} from "../types/pokemon";

const API_BASE_URL = "https://pokeapi.co/api/v2";
const POKEMON_LIST_LIMIT = 151;

export function parsePokemonId(url: string): number {
  const segments = url.split("/").filter(Boolean);
  const id = Number(segments[segments.length - 1]);

  if (Number.isNaN(id)) {
    throw new Error(`No se pudo obtener el id de ${url}`);
  }

  return id;
}

export function getPokemonArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function formatPokemonNumber(id: number): string {
  return `#${id.toString().padStart(3, "0")}`;
}

export function formatPokemonName(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function getPokemonList(): Promise<PokemonListItem[]> {
  const response = await fetch(
    `${API_BASE_URL}/pokemon?limit=${POKEMON_LIST_LIMIT}&offset=0`,
    {
      next: {
        revalidate: 60 * 60 * 24,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al obtener la lista de Pokémon");
  }

  const data: PokemonListResponse = await response.json();

  return data.results
    .map((pokemon) => {
      const id = parsePokemonId(pokemon.url);

      return {
        ...pokemon,
        id,
        imageUrl: getPokemonArtworkUrl(id),
      };
    })
    .sort((a, b) => a.id - b.id);
}

export async function getPokemon(nameOrId: string): Promise<PokemonDetail> {
  const response = await fetch(
    `${API_BASE_URL}/pokemon/${nameOrId.toLowerCase()}`,
    {
      next: {
        revalidate: 60 * 60 * 24,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al obtener el Pokémon");
  }

  return response.json();
}