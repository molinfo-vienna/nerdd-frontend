// Vitest setup file
// This adds custom DOM testing matchers (like toHaveTextContent)
import "@testing-library/jest-dom"

// Set up any global test configuration here
import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

// Automatically clean up after each test
afterEach(() => {
    cleanup()
})
