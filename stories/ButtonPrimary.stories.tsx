import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { PrimaryButton } from '../components/PrimaryButton'

export default {
	title: 'Buttons/PrimaryButton',
	component: PrimaryButton,
	argTypes: {
		//backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof PrimaryButton>

const Template: ComponentStory<typeof PrimaryButton> = args => (
	<PrimaryButton {...args} />
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
