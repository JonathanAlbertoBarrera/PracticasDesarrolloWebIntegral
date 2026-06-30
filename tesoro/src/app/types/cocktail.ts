export type AlcoholicType = "Alcohólico" | "Sin alcohol";

export interface Cocktail {
  id: string;
  name: string;
  category: string;
  alcoholic: AlcoholicType;
  glass: string;
  instructions: string;
  ingredients: string;
}

export type CocktailInput = Omit<Cocktail, "id">;
