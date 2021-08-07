import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'
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
import { SecondaryButton } from './SecondaryButton'
import { PrimaryButton } from './PrimaryButton'
import { submitRecipe } from '../functions/api/recipes'

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
	const [session, loading] = useSession()
	// const selectIngrs = ingrArray.map(i => {
	// 	return { value: i._id, label: i.name }
	// })
	//console.log('session.uid :>> ', session.uid)

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
												<SecondaryButton
													small
													type='button'
													onClick={() => remove(index)}
												>
													X
												</SecondaryButton>
											</Wrapper>
										))}
									<SecondaryButton
										type='button'
										onClick={() => push(ingrInitialValues)}
									>
										Another
									</SecondaryButton>
								</div>
							)}
						</FieldArray>
						<PrimaryButton type='submit'>Submit</PrimaryButton>
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
