import React, { memo } from 'react'
import styled from 'styled-components'
import { Formik, Field, Form } from 'formik'
import _ from 'lodash'
import { CheckboxFormProps } from '../server/interfaces'
import { HiddenButton } from './Button'

export const CheckboxForm = memo(
	({ options, initialChecked = [], onSubmit }: CheckboxFormProps) => {
		const checkboxes = options.map(option => {
			return (
				<label key={option.id}>
					<Field type='checkbox' name='checked' value={option.label} />
					<span>
						{option.label[0].toUpperCase() +
							option.label.slice(1).toLowerCase()}
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
)
CheckboxForm.displayName = 'CheckboxForm'

const StyledForm = styled.div`
	display: flex;
	flex-direction: column;
`

const StyledCheckboxWrapper = styled.div`
	display: flex;
	flex-direction: column;
	label {
		padding: 5px 0;
		display: flex;
		align-items: center;
		span {
			color: ${p => p.theme.text.dark07};
			font: 400 1.5rem ${p => p.theme.font.body};
			margin-left: 1ch;
		}
	}
`
