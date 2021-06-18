import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getRecipes } from '../server/functions'

export default function NewRecipe() {

  const [recipeArray, setRecipeArray] = useState([])
  const SearchObj = {type: 'ingr', terms: ['91']}
  console.log('SearchObj :>> ', SearchObj);

  const fetchRecipes = async () => {
    const mongoResponse = await getRecipes(SearchObj)
    setRecipeArray(mongoResponse)
  }

  useEffect(() => {
    fetchRecipes()
  }, [])




	return (
		<RecipeForm />
	)
}


function RecipeForm() {
  const saveRecipe = async event => {
    event.preventDefault()

    // const res = await fetch('/api/register', {
    //   body: JSON.stringify({
    //     name: event.target.name.value
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'POST'
    // })

    // const result = await res.json()
    // result.user => 'Ada Lovelace'
  }

  return (
    <form onSubmit={saveRecipe}>
			<span>name</span>
      <input name="name" type="text" required />
			<span>desc</span>
			<input name="description" type="text" required />
			<span>image</span>
			<input name="image" type="text" required />
			<span>ingredients</span>
			<input name="ingredients" type="text" required />
      <button type="submit">Save</button>
    </form>
  )
}