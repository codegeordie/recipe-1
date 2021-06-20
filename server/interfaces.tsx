import { Currency } from "dinero.js";

export interface RecipeBase {
	id: string;
	name: string;
	description: string;
	image: string;
	ingredients: {ingredientId: string, quantity: number}[]
}

export interface RecipePopulated extends RecipeBase {
	cost: {
		currency: Currency;
		value: number;
	};
	calories: number;
}

export interface Ingredient {
	id: string;
	name: string;
	quantity: number;
	calories: number;
	cost: {
		currency: Currency;
		value: number;
	};
}

export interface QueryObject {
	type: string;
	terms: string[]; 
}


export interface RecipeListProps {
	recipesToRender: RecipePopulated[]
}

export interface RecipeCardProps {
	recipeData: RecipePopulated
}

export interface IngredientsProps {
	ingrArray: Ingredient[]
}

export interface RecipePageProps {
	ingrArray: Ingredient[]
}