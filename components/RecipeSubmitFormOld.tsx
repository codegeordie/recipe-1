import React from 'react'
import styled from 'styled-components'
import { useSession } from 'next-auth/client'
import {
	Formik,
	Field,
	Form,
	ErrorMessage,
	FieldArray,
	useFormikContext,
} from 'formik'
import { IngredientsProps } from '../server/interfaces'
import { PrimaryButton, RoundButton, SecondaryButton } from './Button'
import { submitRecipe } from '../functions/api/recipes'
import { Dropdown } from './Dropdown'
import { DropdownFormik } from './DropdownFormik'

const ImageUploadInput = () => {
	const formikProps = useFormikContext()
	return (
		<StyledFileInput
			id='file'
			type='file'
			name='file'
			onChange={(e: React.FormEvent<HTMLInputElement>) => {
				if (e.currentTarget.files)
					formikProps.setFieldValue('photo', e.currentTarget.files[0])
			}}
		/>
	)
}

export const RecipeSubmitFormOld = ({ ingrArray }: IngredientsProps) => {
	const [session, loading] = useSession()
	// const selectIngrs = ingrArray.map(i => {
	// 	return { value: i._id, label: i.name }
	// })
	//console.log('session.uid :>> ', session.uid)

	const DropdownValues = ingrArray.map(i => ({
		id: i._id,
		value: i.name,
	}))

	const ingredientSelect = ingrArray.map(i => {
		return (
			<option key={i._id} value={i._id}>
				{i.name}
			</option>
		)
	})

	const ingrInitialValues = {
		ingredient_id: ingrArray[0]._id,
		quantity: 100,
		measure: 'g',
	}

	const initialValues = {
		name: '',
		description: '',
		image: '',
		photo: '',
		servings: '',
		ingredients: [ingrInitialValues],
	}

	return (
		<>
			<Formik
				initialValues={initialValues}
				//enableReinitialize={true}
				onSubmit={async values => {
					if (!session) {
						throw Error('not logged in, cannot submit')
					}
					values.uid = session.uid
					if (values.photo) {
						let data = new FormData()
						data.append('photo', values.photo)

						const { url } = await fetch(
							'http://localhost:5001/api/imagesubmit',
							{
								method: 'post',
								body: data,
							}
						).then(res => res.json())

						values.image = url
					}

					submitRecipe(values)
				}}
			>
				{({ values }) => (
					<StyledForm>
						<StyledTextPortion>
							<Wrapper>
								<StyledInputWrapper>
									<StyledInput
										id='name'
										name='name'
										placeholder='recipe name'
										autoComplete='off'
										required
									/>
									<StyledInputLabel htmlFor='name'>
										Recipe Name
									</StyledInputLabel>
								</StyledInputWrapper>
								<StyledInputWrapper>
									<StyledInput
										id='description'
										name='description'
										as='textarea'
										placeholder='recipe description'
										autoComplete='off'
										required
									/>
									<StyledInputLabel htmlFor='description'>
										Description
									</StyledInputLabel>
								</StyledInputWrapper>
								<StyledLabel htmlFor='file'>Upload an Image</StyledLabel>
								<ImageUploadInput />
							</Wrapper>
						</StyledTextPortion>
						<StyledTextPortion>
							<Wrapper>
								<StyledInputWrapper>
									<StyledInput
										id='servings'
										name='servings'
										placeholder='2'
										autoComplete='off'
										required
									/>
									<StyledInputLabel htmlFor='servings'>
										Servings
									</StyledInputLabel>
								</StyledInputWrapper>
								<FieldArray name='ingredients'>
									{({ insert, remove, push }) => (
										<StyledIngredientsWrapper>
											{values.ingredients.length > 0 &&
												values.ingredients.map((ingredient, index) => (
													<StyledIngredientRowWrapper
														className='row'
														key={index}
													>
														<DropdownFormik
															name={`ingredients.${index}.ingredient_id`}
															items={DropdownValues}
															label='Select an Ingredient'
														/>
														<StyledNumInput
															name={`ingredients.${index}.quantity`}
															//type='number'
															min='0'
															//step='0.01'
															autoComplete='off'
															required
														/>
														<Field
															component={DropdownFormik}
															name={`ingredients.${index}.measure`}
															items={[
																{ id: '1', value: 'g' },
																{ id: '2', value: 'oz' },
																{ id: '3', value: 'lb' },
															]}
															// itemToString={item => item.value}
															label='Quantity'
															// onSelectedItemChange={item => {
															// 	console.log(item)
															// }}
														/>
														<IngredientRemoveButton>
															<RoundButton
																small
																type='button'
																onClick={() => remove(index)}
															>
																X
															</RoundButton>
														</IngredientRemoveButton>
														{/* <StyledSelect
															name={`ingredients.${index}.measure`}
															component='select'
														>
															<option value={'g'}>g</option>
															<option value={'oz'}>oz</option>
															<option value={'lb'}>lb</option>
														</StyledSelect> */}
														{/* <ErrorMessage name={`ingredients.${index}.quantity`} component="div" className="field-error"/> */}
														{/* <StyledLabel
															htmlFor={`ingredients.${index}.ingredient_id`}
														>
															Ingredient
														</StyledLabel>
														<StyledReactSelect
													name={`ingredients.${index}.ingredient_id`}
													options={selectIngrs}
													value={selectIngrs ? selectIngrs.find(option => option.value === field.value) : ''}
      										onChange={(option) => form.setFieldValue(field.name, option.value)}
												/> */}
														{/* <StyledSelect
															name={`ingredients.${index}.ingredient_id`}
															component='select'
														>
															{ingredientSelect}
														</StyledSelect> */}
														{/* <ErrorMessage name={`ingredients.${index}.name`} component="div" className="field-error"/> */}
													</StyledIngredientRowWrapper>
												))}
											<AdditionalIngredientButton>
												<SecondaryButton
													small
													type='button'
													onClick={() => push(ingrInitialValues)}
												>
													Add an Ingredient
												</SecondaryButton>
											</AdditionalIngredientButton>
										</StyledIngredientsWrapper>
									)}
								</FieldArray>
							</Wrapper>
						</StyledTextPortion>
						<PrimaryButton type='submit'>Submit</PrimaryButton>
					</StyledForm>
				)}
			</Formik>
		</>
	)
}

const StyledForm = styled(Form)`
	border: 1px solid ${p => p.theme.color.delta};
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 40px;
`

const StyledTextPortion = styled.div``

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-content: center;
	//padding: 0.5rem;
`

const StyledIngredientsWrapper = styled.div`
	//border: 1px solid blue;
	display: flex;
	flex-direction: column;
`

const StyledIngredientRowWrapper = styled.div`
	display: flex;
	align-items: center;
	//border: 1px solid red;
`

const StyledLabel = styled.label`
	height: 1.5rem;
	font: 1.5rem ${p => p.theme.font.body};
	color: ${p => p.theme.text.dark07};
	margin: 0 0 0.3rem 1rem;
`

const StyledFileWrapper = styled.div``

const IngredientRemoveButton = styled.div`
	margin-left: 1rem;
`

const AdditionalIngredientButton = styled.div`
	margin-top: 10px;
	align-self: center;
`

// const StyledInput = styled(Field)`
// 	font: 400 1.6rem ${p => p.theme.font.body};
// 	line-height: 1.5;
// 	margin-bottom: 15px;
// `

// const StyledTextArea = styled(Field)`
// 	font: 400 1.6rem ${p => p.theme.font.body};
// 	line-height: 1.5;
// 	margin-bottom: 15px;
// 	resize: none;
// `

// const StyledNumInput = styled(Field)`
// 	font: 400 1.5rem ${p => p.theme.font.body};
// 	//width: 6rem;
// `

const StyledSelect = styled(Field)`
	padding: 0.2rem;
	font: 400 1.6rem ${p => p.theme.font.body};
`

// const StyledReactSelect = styled(Select)`
// 	//padding: 0.2rem;
// 	flex: 1;
// 	font: 400 1.6rem ${p => p.theme.font.body};
// `

////////////////////
//// input
/////////////////////
const StyledFileInput = styled(Field)`
	font: 1.3rem ${p => p.theme.font.body};
	padding: 0.5rem 1rem;
	margin-bottom: 2rem;
	background-color: rgba(0, 0, 0, 0.03);
	transition: 0.25s;
	&::file-selector-button {
		cursor: pointer;
		background: none;
		border-radius: 9px;
		padding: 0.5rem 1rem;
		font: 700 1.3rem ${p => p.theme.font.button};
		color: ${p => p.theme.text.dark07};
		border: 1px solid transparent;
		box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
		transition: 0.25s;
		&:hover {
			border: 1px solid ${p => p.theme.color.delta};
			//color: ${p => p.theme.color.delta};
		}
	}
`

const StyledInput = styled(Field)`
	outline: none;
	border: none;
	background: none;
	resize: none;
	font: 2rem ${p => p.theme.font.body};
	padding: 0.5rem;
	background-color: rgba(0, 0, 0, 0.03);
	transition: 0.25s;
	&::placeholder {
		opacity: 0;
	}
	/* &:not(:placeholder-shown)&:valid {
		box-shadow: inset 0 0 2px red;
	} */
`

const StyledNumInput = styled(StyledInput)`
	//font: 400 1.5rem ${p => p.theme.font.body};
	width: 6rem;
`

const StyledInputLabel = styled.label`
	pointer-events: none;
	position: relative;
	height: 1.5rem;
	font: 1.5rem ${p => p.theme.font.body};
	color: ${p => p.theme.text.dark07};
	margin: 0 0 0.3rem 1rem;
	transition: 0.25s;
	transform: translate(10%, 2.6rem) scale(1.2);
	opacity: 0.7;
	${StyledInput}:not(:placeholder-shown) ~ & {
		transform: translate(0) scale(1);
		opacity: 1;
	}
`

const StyledInputWrapper = styled.div`
	margin-bottom: 2rem;
	display: flex;
	flex-direction: column-reverse;
	position: relative;
	overflow: hidden;
	&::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		height: 3px;
		width: 100%;
		background-color: purple;
		transition: transform 0.25s ease-in-out;
		transform: translateX(-100%);
	}
	&:hover {
		&::after {
			transform: translateX(-90%);
			transition: 0.35s;
		}
	}
	&:focus-within {
		&::after {
			transform: translateX(0);
			transition: 0.15s;
		}
		${StyledInputLabel} {
			transform: translate(0) scale(1);
			opacity: 1;
		}
	}
`
////////////////////
//// end input
/////////////////////
