import React from 'react'
import styled from 'styled-components'
import {
	Formik,
	Field,
	Form,
	ErrorMessage,
	FieldArray,
	useFormikContext,
} from 'formik'
import { IngredientsProps } from '../server/interfaces'
import { useSubmitRecipe } from '../hooks/useSubmitRecipe'

const ImageUploadInput = () => {
	const formikProps = useFormikContext()
	return (
		<StyledInput
			id='file'
			type='file'
			name='file'
			onChange={(e: React.FormEvent<HTMLInputElement>) => {
				formikProps.setFieldValue('photo', e.currentTarget.files[0])
			}}
		/>
	)
}

export const RecipeSubmitForm = ({ ingrArray }: IngredientsProps) => {
	const { submitRecipe } = useSubmitRecipe()

	const ingredientSelect = ingrArray.map(i => {
		return (
			<option key={i._id} value={i._id}>
				{i.name}
			</option>
		)
	})

	const initialValues = {
		name: '',
		description: '',
		image: '',
		photo: '',
		servings: 1,
		ingredients: [
			{
				ingredient_id: ingrArray[0]._id,
				quantity: 1,
			},
		],
	}

	return (
		<>
			<Formik
				initialValues={initialValues}
				//enableReinitialize={true}
				onSubmit={async values => {
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
						<Wrapper>
							<ImageUploadInput />

							<StyledLabel htmlFor='name'>Name</StyledLabel>
							<StyledInput
								id='name'
								name='name'
								placeholder='Chicken'
								autoComplete='off'
								required
							/>
						</Wrapper>
						<Wrapper>
							<StyledLabel htmlFor='description'>Description</StyledLabel>
							<StyledInput
								id='description'
								name='description'
								placeholder='lorem'
								autoComplete='off'
								required
							/>
						</Wrapper>
						<Wrapper>
							<StyledLabel htmlFor='servings'>Servings</StyledLabel>
							<StyledInput
								id='servings'
								name='servings'
								placeholder='2'
								autoComplete='off'
								required
							/>
						</Wrapper>
						<FieldArray name='ingredients'>
							{({ insert, remove, push }) => (
								<div>
									{values.ingredients.length > 0 &&
										values.ingredients.map((ingredient, index) => (
											<Wrapper className='row' key={index}>
												<StyledLabel
													htmlFor={`ingredients.${index}.ingredient_id`}
												>
													Ingredient
												</StyledLabel>

												<StyledSelect
													name={`ingredients.${index}.ingredient_id`}
													component='select'
												>
													{ingredientSelect}
												</StyledSelect>
												{/* <ErrorMessage name={`ingredients.${index}.name`} component="div" className="field-error"/> */}
												<StyledSelect
													name={`ingredients.${index}.quantity`}
													component='select'
												>
													<option value={1}>1</option>
													<option value={2}>2</option>
													<option value={3}>3</option>
													<option value={4}>4</option>
													<option value={5}>5</option>
												</StyledSelect>
												{/* <ErrorMessage name={`ingredients.${index}.quantity`} component="div" className="field-error"/> */}
												<Button
													type='button'
													className='secondary'
													onClick={() => remove(index)}
												>
													X
												</Button>
											</Wrapper>
										))}
									<Button
										type='button'
										className='secondary'
										onClick={() =>
											push({ ingredient_id: ingrArray[0]._id, quantity: 1 })
										}
									>
										Another
									</Button>
								</div>
							)}
						</FieldArray>
						<Button type='submit'>Submit</Button>
					</StyledForm>
				)}
			</Formik>
		</>
	)
}

const StyledForm = styled(Form)`
	width: 500px;
	max-width: 500px;

	border: 1px solid ${p => p.theme.color.delta};
	display: flex;
	flex-direction: column;
	align-content: center;
`

const Wrapper = styled.div`
	display: flex;
	padding: 0.5rem;
`

const StyledLabel = styled.label`
	flex: 1;
	text-align: right;
	font: 400 1.6rem ${p => p.theme.font.body};
`

const StyledInput = styled(Field)`
	flex: 1;
	font: 400 1.6rem ${p => p.theme.font.body};
	//border: 1px solid blue;
`

const StyledSelect = styled(Field)`
	//border: 1px solid red;
	padding: 0.2rem;
	//font-size: .8rem;
	font: 400 1.6rem ${p => p.theme.font.body};
`

// const Button = styled.button`
// 	max-width: 150px;
// 	padding: 0.2rem 1rem;
// 	font: 1.8rem ${p => p.theme.font.body};
// 	color: ${p => p.theme.color.neutral};
// 	border: 2px solid ${p => p.theme.color.beta};
// 	//border-radius: .5rem;
// 	background-color: ${p => p.theme.color.alpha};
// `
const Button = styled.button`
	cursor: pointer;
	font: 700 2rem ${p => p.theme.font.title};
	line-height: 2rem;
	padding: 0.5rem 2rem;
	color: ${p => p.theme.color.delta};
	border: 2px solid ${p => p.theme.color.delta};
	background-color: ${p => p.theme.color.white};
	transition: 0.2s;
	&:hover {
		color: ${p => p.theme.color.white};
		background-color: ${p => p.theme.color.delta};
	}
`
