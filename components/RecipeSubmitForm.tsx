import React from 'react'
import styled from 'styled-components'
//import { useSession } from 'next-auth/client'
import { FieldArray, useFormik, FormikProvider } from 'formik'
import { IngredientsProps, RecipeSubmittal } from '../server/interfaces'
import { submitRecipe } from '../functions/api/recipes'
import {
	PrimaryButton,
	RoundButton,
	SecondaryButton,
	TextButton,
} from './Button'
import { DropdownFormik } from './DropdownFormik'
import { InputFormik } from './InputFormik'
import { TextareaFormik } from './TextareaFormik'
import { FileInputFormik } from './FileInputFormik'
import { NumInputFormik } from './NumInputFormik'
import { Toggle, ToggleFormik } from './Toggle'

export const RecipeSubmitForm = ({ ingrArray }: IngredientsProps) => {
	//const [session, loading] = useSession()

	const ingrInitialValues = {
		ingredient_id: ingrArray[0]._id,
		quantity: 100,
		measure: 'g',
	}

	const initialValues = {
		//uid: '',
		isPrivate: false,
		name: '',
		description: '',
		image: '',
		photo: '',
		servings: 1,
		ingredients: [ingrInitialValues],
	}

	const onSubmit = async (values: RecipeSubmittal) => {
		//if (!session) throw Error('not logged in, cannot submit')
		//values.uid = session.uid as string

		if (values.photo) {
			let data = new FormData()
			data.append('photo', values.photo)

			const { url } = await fetch('http://localhost:5001/api/imagesubmit', {
				method: 'POST',
				body: data,
			}).then(res => res.json())

			values.image = url
		}
		submitRecipe(values)
	}

	const formik = useFormik({
		initialValues,
		onSubmit,
		//onSubmit: values => alert(JSON.stringify(values, null, 2)),
	})

	return (
		<FormikProvider value={formik}>
			<StyledForm onSubmit={formik.handleSubmit}>
				<StyledGridWrapper>
					<InputFormik label='Recipe Name' name='name' formik={formik} />
					<TextareaFormik
						label='Description'
						name='description'
						formik={formik}
					/>
					<FileInputFormik
						label='Upload an Image'
						name='file'
						required={false}
						formik={formik}
					/>
					<StyledRowWrapper>
						<NumInputFormik label='Servings' name='servings' formik={formik} />
						<input
							type='checkbox'
							name='isPrivate'
							onChange={formik.handleChange}
							value={formik.values.isPrivate}
						/>
						{/* <StyledPrivateToggleWrapper>
							<StyledLabel>Keep Recipe Private</StyledLabel>
							<ToggleFormik name='isPrivate' formik={formik} />
						</StyledPrivateToggleWrapper> */}
					</StyledRowWrapper>
				</StyledGridWrapper>
				<StyledGridWrapper>
					<FieldArray name='ingredients'>
						{({ insert, remove, push }) => (
							<StyledIngredientsWrapper>
								<StyledLabel>Ingredients and Measures</StyledLabel>
								{formik.values.ingredients.length > 0 &&
									formik.values.ingredients.map((ingredient, index) => (
										<StyledIngredientRowWrapper className='row' key={index}>
											<DropdownFormik
												label='Select an Ingredient'
												name={`ingredients.${index}.ingredient_id`}
												items={ingrArray.map(i => ({
													id: i._id,
													value: i.name,
												}))}
											/>
											<NumInputFormik
												label=''
												name={`ingredients.${index}.quantity`}
												formik={formik}
											/>
											<DropdownFormik
												label='Quantity'
												name={`ingredients.${index}.measure`}
												items={[
													{ id: 'g', value: 'g' },
													{ id: 'oz', value: 'oz' },
													{ id: 'lb', value: 'lb' },
												]}
												initialSelectedItem={{ id: 'g', value: 'g' }}
											/>
											<TextButton
												small
												type='button'
												onClick={() => remove(index)}
											>
												X
											</TextButton>
										</StyledIngredientRowWrapper>
									))}
								<AdditionalIngredientButton>
									<SecondaryButton
										small
										type='button'
										onClick={() => push(ingrInitialValues)}
									>
										+ Ingredient
									</SecondaryButton>
								</AdditionalIngredientButton>
							</StyledIngredientsWrapper>
						)}
					</FieldArray>
				</StyledGridWrapper>
				<StyledSubmitButtonWrapper>
					<PrimaryButton type='submit'>Submit Recipe</PrimaryButton>
				</StyledSubmitButtonWrapper>
			</StyledForm>
		</FormikProvider>
	)
}

const StyledForm = styled.form`
	display: grid;
	grid-template-columns: 1fr;
	column-gap: 40px;
	row-gap: 20px;
	margin-top: 15px;
	@media screen and (min-width: 768px) {
		grid-template-columns: 1fr 1fr;
		row-gap: normal;
	}
`

const StyledGridWrapper = styled.div`
	display: grid;
	align-items: start;
	grid-template-columns: 1fr;
	grid-auto-rows: min-content;
	row-gap: 20px;
`

const StyledRowWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
`

const StyledPrivateToggleWrapper = styled.div`
	margin: auto;
	display: flex;
	label {
		margin-right: 0.5rem;
	}
`

const StyledIngredientsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 768px) {
		margin: 0 auto;
	}
`

const StyledIngredientRowWrapper = styled.div`
	display: grid;
	grid-template-columns: 160px 5rem 3.5rem auto;
	grid-template-rows: 1fr;
	column-gap: 5px;
	align-items: center;
	margin-bottom: 5px;
	@media screen and (min-width: 576px) {
		grid-template-columns: 175px 6.5rem 3.5rem auto;
		column-gap: 10px;
	}
`

const StyledLabel = styled.label`
	pointer-events: none;
	position: relative;
	height: 1.5rem;
	font: 1.5rem ${p => p.theme.font.body};
	color: ${p => p.theme.text.dark07};
	margin: 0 0 0.3rem 1rem;
`

const AdditionalIngredientButton = styled.div`
	margin-top: 10px;
	align-self: center;
`

const StyledSubmitButtonWrapper = styled.div`
	grid-column: span 2;
	display: grid;
	place-content: center;
	margin-top: 10px;
	@media screen and (max-width: 768px) {
		grid-column: span 1;
	}
`
