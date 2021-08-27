import { Currency } from 'dinero.js'

type RecipeIngredients = {
	ingredient_id: string
	quantity: number
	measure: 'g' | 'oz' | 'lb' | string
}

export type RecipeSubmittal = {
	uid?: string
	isPublic?: boolean
	name: string
	description: string
	image: string
	photo: any
	servings: number
	ingredients: RecipeIngredients[]
	createdAt?: Date
	updatedAt?: Date
}

export type RecipeBase = {
	_id: string
	name: string
	description: string
	image: string
	servings: number
	ingredients: RecipeIngredients[]
	tags: string[]
	calories: number
	cost: { value: number; currency: Currency }
	createdBy: string
	isPrivate?: boolean
	createdAt: Date
	updatedAt: Date
}

export type Recipe = RecipeBase & {
	ingredients_full: Ingredient[]
	serving_cal: number
	favorited: boolean
}

export type Ingredient = {
	_id: string
	name: string
	quantity: number
	calories: number
	cost: {
		currency: Currency
		value: number
	}
}

export type Tag = {
	_id: string
	tag_name: string
}

export type Option = { id: string; label: string }
export type CheckboxFormProps = {
	options: Option[]
	initialChecked?: string[]
	onSubmit: (selectedOptions: Option[]) => void
}

export interface MongoQ_Name {
	name: string | undefined
}

interface MongoQ_Id {
	id: string
}

interface MongoQ_IdMany {
	id: string[]
}

interface MongoQ_Filters {
	filters: string[] | undefined
}

export type GetRecipesQuery = {
	name?: string
	filters?: string[]
	cal_min?: string
	cal_max?: string
	showOnlyCreated?: boolean
	showOnlyFavorites?: boolean
	currency?: string
}

// export type GetIngredientsQuery = {
// 	name?: string
// 	_id?: string
// }

// export type GetIngredientsQuery =
// 	| MongoQ_Name
// 	| MongoQ_Id
// 	| MongoQ_IdMany
// 	| undefined

export interface RArrayAsProps {
	recipes: Recipe[]
	id: string
}

export interface RecipeAsProps {
	recipe: Recipe
}

export interface IngredientsProps {
	ingrArray: Ingredient[]
	ingrRec?: RecipeIngredients[]
}

// export interface RecipePageProps {
// 	ingrArray: Ingredient[]
// }
