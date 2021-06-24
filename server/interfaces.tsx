import { Currency } from "dinero.js";

export interface RecipeBase {
	_id: string;
	name: string;
	description: string;
	image: string;
	tags: string[];
	calories: number;
	cost: {value: number, currency: Currency}
	ingredients: {ingredient_id: string, quantity: number}[]
}

export interface Recipe extends RecipeBase {
	ingredients_full: Ingredient[]
}

export interface Ingredient {
	_id: string;
	name: string;
	quantity: number;
	calories: number;
	cost: {
		currency: Currency;
		value: number;
	}
}

export interface GRQ_Name {
	name: string;
}

interface GRQ_Id {
	id: string;
}

interface GRQ_IdMany {
	id: string[];
}

export type GetRecipesQuery = GRQ_Name | GRQ_Id | GRQ_IdMany | undefined;



export interface RArrayAsProps {
	recipesToRender: Recipe[]
}

export interface RecipeAsProps {
	recipe: Recipe
}

export interface IngredientsProps {
	ingrArray: Ingredient[]
}

// export interface RecipePageProps {
// 	ingrArray: Ingredient[]
// }