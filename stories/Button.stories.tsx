import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from '../components/Button'

export default {
	title: 'Buttons/Button-Core',
	component: Button,
	//subcomponents: { PrimaryButton, GhostButton, HiddenButton, DangerButton },
	argTypes: {
		//backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => <Button {...args} />

export const Core = Template.bind({})
Core.args = {
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
