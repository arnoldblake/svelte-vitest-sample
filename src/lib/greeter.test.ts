import { render, screen } from '@testing-library/svelte/svelte5'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, test } from 'vitest'

import Greeter from './greeter.svelte'

describe('greeter', () => {

	beforeAll(async () => {
		render(Greeter, { name: 'World' })
	})

	test('no initial greeting', () => {
		const button = screen.getByRole('button', { name: 'Greet' })
		const greeting = screen.queryByText(/hello/iu)

		expect(button).toBeInTheDocument()
		expect(greeting).not.toBeInTheDocument()
	})

	test('greeting appears on click', async () => {
		const user = userEvent.setup()

		const button = screen.getByRole('button')
		await user.click(button)
		const greeting = screen.getByText(/hello world/iu)

		expect(greeting).toBeInTheDocument()
	})


})

