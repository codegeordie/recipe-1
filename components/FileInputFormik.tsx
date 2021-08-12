import { useField, useFormikContext } from 'formik'
import styled from 'styled-components'

type FileInputFormik = {
	formik: any
	label: string
	name: string
	autoComplete?: string
	required?: boolean
}

export const FileInputFormik = ({
	label,
	formik,
	autoComplete = 'off',
	required = true,
	...props
}: FileInputFormik) => {
	const [field, meta] = useField(props)

	return (
		<StyledInputWrapper {...props}>
			<StyledFileInput
				type='file'
				autoComplete={autoComplete}
				required={required}
				{...field}
				onChange={(e: React.FormEvent<HTMLInputElement>) => {
					if (e.currentTarget.files)
						formik.setFieldValue('photo', e.currentTarget.files[0])
				}}
			/>
			<StyledLabel>{label}</StyledLabel>
		</StyledInputWrapper>
	)
}

const StyledFileInput = styled.input`
	font: 1.3rem ${p => p.theme.font.body};
	padding: 0.5rem 1rem;
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

const StyledLabel = styled.label`
	pointer-events: none;
	height: 1.5rem;
	font: 1.5rem ${p => p.theme.font.body};
	color: ${p => p.theme.text.dark07};
	margin: 0 0 0.3rem 1rem;

	/* pointer-events: none;
	position: relative;
	height: 1.5rem;
	font: 1.5rem ${p => p.theme.font.body};
	margin: 0 0 0.3rem 1rem;
	transition: 0.25s;
	transform: translate(10%, 2.6rem) scale(1.2);
	opacity: 0.6; */
`

const StyledInputWrapper = styled.div`
	display: flex;
	flex-direction: column-reverse;
	/* position: relative;
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
		${StyledLabel} {
			transform: translate(0) scale(1);
			opacity: 1;
		}
	} */
`
