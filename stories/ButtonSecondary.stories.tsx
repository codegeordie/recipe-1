import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { SecondaryButton } from '../components/SecondaryButton'

export default {
	title: 'Buttons/SecondaryButton',
	component: SecondaryButton,
	argTypes: {
		//backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof SecondaryButton>

const Template: ComponentStory<typeof SecondaryButton> = args => (
	<SecondaryButton {...args} />
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
