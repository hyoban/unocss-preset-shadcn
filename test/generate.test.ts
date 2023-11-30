import { describe, expect, it } from 'vitest'
import { generateCSSVars } from '../src/generate'

describe('generate-theme-css-var', () => {
  it('output', () => {
    expect(generateCSSVars('zinc', 0.5)).toMatchFileSnapshot('zinc-0.5.css')
    expect(generateCSSVars('neutral', 0.75)).toMatchFileSnapshot('neutral-0.75.css')
  })
})
