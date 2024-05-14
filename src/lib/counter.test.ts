import { render, screen } from '@testing-library/svelte/svelte5'
import userEvent from '@testing-library/user-event'
import { beforeAll, beforeEach, describe, expect, expectTypeOf, test } from 'vitest'

import Counter from './counter.svelte'
import { createCounter } from '$lib/counter.svelte.ts'

describe('counter', () => {
	beforeAll(async () => {
		render(Counter)
	})

	test('the count begins at 0', () => {
		const button = screen.getByRole('button')
		const count = screen.queryByText(/clicks: 0/iu)

		expect(button).toBeInTheDocument()
		expect(count).toBeInTheDocument()

	})

	test('the clicks increases by one', async () => {
		const user = userEvent.setup()
		const button = screen.getByRole('button')
		await user.click(button)
		const count = screen.getByText(/clicks: 1/iu)

		expect(count).toBeInTheDocument()
	})
})

describe('counter store', () => {
	test('createCounter is a function', () => { expectTypeOf(createCounter).toBeFunction() })

	test('createCounter returns a the correct type', () => {
		const counter = createCounter()
		expectTypeOf(counter).toMatchTypeOf<{
			readonly count: number;
			increment: () => number;
		}>()
	})

	test('count initializes at 0', () => {
		const counter = createCounter()
		expect(counter.count).toBe(0)
	})

	test('count increments by one when calling increment', () => {
		const counter = createCounter()
		counter.increment()
		expect(counter.count).toBe(1)
	})
})
