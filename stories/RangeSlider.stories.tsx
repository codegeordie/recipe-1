import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { RangeSlider } from '../components/RangeSlider'

export default {
	title: 'Example/RangeSlider',
	component: RangeSlider,
	argTypes: {
		//backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof RangeSlider>

const Template: ComponentStory<typeof RangeSlider> = args => (
	<RangeSlider {...args} />
)

export const Default = Template.bind({})
Default.args = {
	label: 'RangeSlider',
	rangeMin: 0,
	rangeMax: 800,
	step: 25,
	valueMin: 100,
	valueMax: 700,
}

// export const Secondary = Template.bind({})
// Secondary.args = {
// 	label: 'RangeSlider',
// }

// export const Large = Template.bind({})
// Large.args = {
// 	size: 'large',
// 	label: 'RangeSlider',
// }

// export const Small = Template.bind({})
// Small.args = {
// 	size: 'small',
// 	label: 'RangeSlider',
// }
