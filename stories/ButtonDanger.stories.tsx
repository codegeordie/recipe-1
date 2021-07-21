import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DangerButton } from '../components/DangerButton'

export default {
	title: 'Buttons/DangerButton',
	component: DangerButton,
	argTypes: {
		//backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof DangerButton>

const Template: ComponentStory<typeof DangerButton> = args => (
	<DangerButton {...args} />
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
