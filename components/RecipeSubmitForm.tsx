import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'
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
				if (e.currentTarget.files)
					formikProps.setFieldValue('photo', e.currentTarget.files[0])
			}}
		/>
	)
}

export const RecipeSubmitForm = ({ ingrArray }: IngredientsProps) => {
	const { submitRecipe } = useSubmitRecipe()

	// const selectIngrs = ingrArray.map(i => {
	// 	return { value: i._id, label: i.name }
	// })

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
		servings: 1,
		ingredients: [ingrInitialValues],
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
												{/* <StyledReactSelect
													name={`ingredients.${index}.ingredient_id`}
													options={selectIngrs}
													value={selectIngrs ? selectIngrs.find(option => option.value === field.value) : ''}
      										onChange={(option) => form.setFieldValue(field.name, option.value)}
												/> */}
												<StyledSelect
													name={`ingredients.${index}.ingredient_id`}
													component='select'
												>
													{ingredientSelect}
												</StyledSelect>
												{/* <ErrorMessage name={`ingredients.${index}.name`} component="div" className="field-error"/> */}
												<StyledNumInput
													name={`ingredients.${index}.quantity`}
													type='number'
													min='0'
													//step='0.01'
													autoComplete='off'
													required
												/>
												<StyledSelect
													name={`ingredients.${index}.measure`}
													component='select'
												>
													<option value={'g'}>g</option>
													<option value={'oz'}>oz</option>
													<option value={'lb'}>lb</option>
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
										onClick={() => push(ingrInitialValues)}
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
`

const StyledNumInput = styled(Field)`
	font: 400 1.6rem ${p => p.theme.font.body};
	width: 6rem;
`

const StyledSelect = styled(Field)`
	padding: 0.2rem;
	font: 400 1.6rem ${p => p.theme.font.body};
`

const StyledReactSelect = styled(Select)`
	//padding: 0.2rem;
	flex: 1;
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
