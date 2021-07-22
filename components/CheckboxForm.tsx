import styled from 'styled-components'
import { Formik, Field, Form } from 'formik'
import _ from 'lodash'
import { CheckboxFormProps } from '../server/interfaces'
import { HiddenButton } from './HiddenButton'

export const CheckboxForm = ({
	options,
	initialChecked = [],
	onSubmit,
}: CheckboxFormProps) => {
	const checkboxes = options.map(option => {
		return (
			<label key={option.id}>
				<Field type='checkbox' name='checked' value={option.label} />
				<span>
					{option.label[0].toUpperCase() + option.label.slice(1).toLowerCase()}
				</span>
			</label>
		)
	})

	return (
		<StyledForm>
			<Formik
				initialValues={{ checked: initialChecked }}
				enableReinitialize={true}
				onSubmit={values => {
					const selectedOptions = _.intersectionWith(
						options,
						values.checked,
						({ label }, checked) => label === checked
					)
					onSubmit(selectedOptions)
				}}
			>
				{({ handleSubmit }) => (
					<Form onChangeCapture={() => handleSubmit()}>
						<h4 id='checkbox-group'>Filter By</h4>
						<StyledCheckboxWrapper
							role='group'
							aria-labelledby='checkbox-group'
						>
							{checkboxes}
						</StyledCheckboxWrapper>

						<HiddenButton type='submit'>Filter</HiddenButton>
					</Form>
				)}
			</Formik>
		</StyledForm>
	)
}

const StyledForm = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	div {
		//font: 400 1.3rem ${p => p.theme.font.body};
	}
	h4 {
		margin-bottom: 1.5rem;
		text-align: center;
		font: 200 1.6rem ${p => p.theme.font.title};
		border-bottom: 1px solid ${p => p.theme.text.dark03};
	}
`

const StyledCheckboxWrapper = styled.div`
	display: flex;
	flex-direction: column;
	label {
		padding: 0.5rem;
		display: flex;
		align-items: center;
		span {
			color: ${p => p.theme.text.dark07};
			font: 400 1.3rem ${p => p.theme.font.body};
			margin-left: 1ch;
		}
	}
`
