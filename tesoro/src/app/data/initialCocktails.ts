import type { Cocktail } from "../types/cocktail";

export const INITIAL_COCKTAILS: Cocktail[] = [
  {
    id: "11007",
    name: "Margarita",
    category: "Bebida clásica",
    alcoholic: "Alcohólico",
    glass: "Copa de cóctel",
    instructions:
      "Frota el borde del vaso con la rodaja de lima para que la sal se adhiera. Agita los demás ingredientes con hielo y viértelos con cuidado en el vaso.",
    ingredients: "Tequila, Triple sec, Jugo de lima, Sal",
  },
  {
    id: "11007",
    name: "Mojito",
    category: "Cóctel",
    alcoholic: "Alcohólico",
    glass: "Vaso highball",
    instructions:
      "Machaca las hojas de menta con azúcar y jugo de lima. Añade un chorro de agua con gas y llena el vaso con hielo picado. Vierte el ron y completa con agua con gas.",
    ingredients: "Ron blanco, Lima, Azúcar, Menta, Agua con gas",
  },
  {
    id: "11001",
    name: "Old Fashioned",
    category: "Cóctel",
    alcoholic: "Alcohólico",
    glass: "Vaso old fashioned",
    instructions:
      "Coloca el cubo de azúcar en el vaso y empápalo con bitter. Añade unas gotas de agua y machaca hasta disolver. Llena el vaso con hielo y agrega el whiskey.",
    ingredients: "Bourbon, Bitter angostura, Azúcar, Agua",
  },
];
