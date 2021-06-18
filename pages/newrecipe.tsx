import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RecipeSubmitForm } from '../components/RecipeSubmitForm'
import { getRecipes } from '../server/functions'

export default function NewRecipe() {

	return (
		<RecipeSubmitForm />
	)
}
