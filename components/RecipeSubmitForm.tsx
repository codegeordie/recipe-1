import { useFormik } from "formik"


export const RecipeSubmitForm = () => {
	const formik = useFormik({
		initialValues:{
			recipeName: '',
			description: '',
			image: '',
			ingredients: ''
		},
		onSubmit: values => {}
	})


	return (
		<>
		<form onSubmit={formik.handleSubmit}>
			<label htmlFor='recipeName'>Recipe Name</label>
			<input
				id='recipeName'
				name='recipeName'
				type='text'
				onChange={formik.handleChange}
				value={formik.values.recipeName}
			/>

			<label htmlFor='description'>Description</label>
			<input
				id='description'
				name='description'
				type='text'
				onChange={formik.handleChange}
				value={formik.values.description}
			/>

			<label htmlFor='image'>Image</label>
			<input
				id='image'
				name='image'
				type='text'
				onChange={formik.handleChange}
				value={formik.values.image}
			/>

			<label htmlFor='ingredients'>Ingredients</label>
			<input
				id='ingredients'
				name='ingredients'
				type='text'
				onChange={formik.handleChange}
				value={formik.values.ingredients}
			/>
			<button type="submit">Submit</button>
		</form>
		</>
	)
}