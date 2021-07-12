import styled from 'styled-components'
import { Formik, Field, Form } from 'formik'
import _ from 'lodash'
import { CheckboxFormProps } from '../server/interfaces'

export const CheckboxForm = ({
	options,
	initialChecked = [],
	onSubmit,
}: CheckboxFormProps) => {
	const checkboxes = options.map(option => {
		return (
			<label key={option.id}>
				<Field type='checkbox' name='checked' value={option.label} />
				{option.label[0].toUpperCase() + option.label.slice(1).toLowerCase()}
			</label>
		)
	})

	return (
		<StyledForm>
			<Formik
				initialValues={{ checked: initialChecked }}
				onSubmit={values => {
					const selectedOptions = _.intersectionWith(
						options,
						values.checked,
						({ label }, checked) => label === checked
					)
					onSubmit(selectedOptions)
				}}
			>
				<Form>
					<h4 id='checkbox-group'>Filter By</h4>
					<StyledCheckboxWrapper role='group' aria-labelledby='checkbox-group'>
						{checkboxes}
					</StyledCheckboxWrapper>

					<Button type='submit'>Filter</Button>
				</Form>
			</Formik>
		</StyledForm>
	)
}

const StyledForm = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	div {
		font: 400 1.6rem ${p => p.theme.font.body};
	}
	h4 {
		margin-bottom: 1.5rem;
		text-align: center;
		font: 200 2rem ${p => p.theme.font.body};
		border-bottom: 1px solid ${p => p.theme.text.dark03};
	}
`

const StyledCheckboxWrapper = styled.div`
	display: flex;
	flex-direction: column;
	label {
		padding: 0.5rem;
	}
`

const Button = styled.button`
	margin-top: 1rem;
	cursor: pointer;
	font: 700 1.8rem ${p => p.theme.font.title};
	line-height: 1.8rem;
	padding: 0.4rem 1.5rem;
	color: ${p => p.theme.color.alpha};
	border: 2px solid ${p => p.theme.color.alpha};
	background-color: ${p => p.theme.color.white};
	transition: 0.2s;
	&:hover {
		color: ${p => p.theme.color.white};
		background-color: ${p => p.theme.color.alpha};
	}
`
