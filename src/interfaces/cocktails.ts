export interface Cocktail {
    name: string;
    glass: string;
    ingredients: string[];
}

export interface CocktailMenu {
    name: string;
    cocktails: Cocktail[];
}
