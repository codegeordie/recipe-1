import { FormikHelpers, Field, Form, Formik, FormikProps } from "formik"
import React from "react";



interface Values {
  firstName: string;
  description: string;
  email: string;
}

export const RecipeSubmitForm = () => {
	return (
		<>
			<h3>Create Recipe</h3>
			<Formik
				initialValues={{
					name: '',
					description: '',
					ingredients: '',
				}}
				onSubmit={(
					values: Values,
					{ setSubmitting }: FormikHelpers<Values>
				) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
					}, 500);
				}}
			>
				<Form>
					<label htmlFor="name">Name</label>
					<Field id="name" name="name" placeholder="John" />
	
					<label htmlFor="description">Description</label>
					<Field id="description" name="description" placeholder="Doe" />

					<label htmlFor="ingredients">Ingredients</label>
					<Field
						id="ingredients"
						name="ingredients"
						placeholder="john@acme.com"
						as="select"
					>
					<option value="red">Red</option>
					<option value="green">Green</option>
					<option value="blue">Blue</option>
					</Field>
					<button type="submit">Submit</button>
				</Form>
			</Formik>
		</>
	)
}

// <div id="checkbox-group">Checked</div>
//           <div role="group" aria-labelledby="checkbox-group">
//             <label>
//               <Field type="checkbox" name="checked" value="One" />
//               One
//             </label>
//             <label>
//               <Field type="checkbox" name="checked" value="Two" />
//               Two
//             </label>
//             <label>
//               <Field type="checkbox" name="checked" value="Three" />
//               Three
//             </label>
//           </div>






// export const RecipeSubmitForm = () => {
// 	const formik = useFormik({
// 		initialValues:{
// 			recipeName: '',
// 			description: '',
// 			image: '',
// 			ingredients: ''
// 		},
// 		onSubmit: values => {}
// 	})


// 	return (
// 		<>
// 		<form onSubmit={formik.handleSubmit}>
// 			<label htmlFor='recipeName'>Recipe Name</label>
// 			<input
// 				id='recipeName'
// 				name='recipeName'
// 				type='text'
// 				onChange={formik.handleChange}
// 				value={formik.values.recipeName}
// 			/>

// 			<label htmlFor='description'>Description</label>
// 			<input
// 				id='description'
// 				name='description'
// 				type='text'
// 				onChange={formik.handleChange}
// 				value={formik.values.description}
// 			/>

// 			<label htmlFor='image'>Image</label>
// 			<input
// 				id='image'
// 				name='image'
// 				type='text'
// 				onChange={formik.handleChange}
// 				value={formik.values.image}
// 			/>

// 			<label htmlFor='ingredients'>Ingredients</label>
// 			<input
// 				id='ingredients'
// 				name='ingredients'
// 				type='text'
// 				onChange={formik.handleChange}
// 				value={formik.values.ingredients}
// 			/>
// 			<button type="submit">Submit</button>
// 		</form>
// 		</>
// 	)
// }