import { classList } from "../src"

test('appropriately filters everything', () => {
    const className = classList(
        'one',
        false || 'two',
        false && 'error',
        true && 'three',
        true || 'error',
        ['our', 'ive'].map(s => `f${s}`),
        ['six', () => 'error']
    )
    expect(className).toBe('one two three four five six')
})