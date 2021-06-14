import { RecipeBase } from "../server/interfaces"

export const recipeData: RecipeBase[] = [
{
	id: "91",
	name: "chicken milan",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut",
	image: "img/chicken.jpg",
	ingredients: [
		{ ingredientId: "1", quantity: 2 },
		{ ingredientId: "5", quantity: 2 },
		{ ingredientId: "8", quantity: 4 },
	]
},
{
	id: "92",
	name: "salmon with lots of other things",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, incididunt ut",
	image: "img/salmon.jpg",
	ingredients: [
		{ ingredientId: "2", quantity: 2 },
		{ ingredientId: "4", quantity: 2 },
	]
},
{
	id: "93",
	name: "gnocchi",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut do eiusmod tempor incididunt ut",
	image: "img/gnocchi.jpg",
	ingredients: [
		{ ingredientId: "9", quantity: 4 },
		{ ingredientId: "6", quantity: 2 },
		{ ingredientId: "5", quantity: 2 },
	]
},
{
	id: "94",
	name: "some tasty meatballs",
	description: "Lorem ipsum doidunt ut do eiusmod tempor incididunt ut",
	image: "img/meatballs.jpg",
	ingredients: [
	{ ingredientId: "3", quantity: 1 },
	{ ingredientId: "5", quantity: 1 },
	{ ingredientId: "4", quantity: 1 },
	{ ingredientId: "8", quantity: 3 },
	]
},
{
	id: "95",
	name: "spaghetti and sauce",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dunt ut",
	image: "img/spaghetti.jpg",
	ingredients: [
		{ ingredientId: "7", quantity: 2 },
		{ ingredientId: "5", quantity: 4 },
		{ ingredientId: "8", quantity: 2 },
	]
},
]
