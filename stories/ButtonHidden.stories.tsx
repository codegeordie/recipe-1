import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TextButton } from '../components/TextButton'

export default {
	title: 'Buttons/TextButton',
	component: TextButton,
	argTypes: {
		//backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof TextButton>

const Template: ComponentStory<typeof TextButton> = args => (
	<TextButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
	children: 'Button',
}

export const Large = Template.bind({})
Large.args = {
	children: 'Small',
	small: true,
}

export const Small = Template.bind({})
Small.args = {
	children: 'Large',
	large: true,
}
